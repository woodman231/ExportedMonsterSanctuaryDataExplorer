import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParentPage } from "../../components/layout";
import Layout from "../../components/layout";
import { MonsterTypeDetailsPage } from "../../page_view_models/monster_type_details";
import Link from "next/link";
import SkillDetailsWithMonstersListComponent from "../../components/skill_details_with_monsters_list";
import ExportedMonsterSanctuaryDataClient from "@woodman231/exportedmonstermanctuarydataclient";
import { SkillDetailsWithMonstersList } from "../../component_view_models/skill_details_wtih_monsters_list";
import ExtendedMonster from "../../export_model_extensions/extended_monster";
import { WithContext, WebPage, VideoGame } from "schema-dts";
import { ExportedMonsterSanctuaryDataExplorerWebsite } from '../../json-ld_objects/exportedmonstersanctuarydataexplorer_website';
import { ExportedMonsterSanctuaryDataExplorerContributors } from "../../json-ld_objects/exportedmonstersanctuarydataexplorer_contributors_org";
import { MonsterSanctuaryVideoGame } from "../../json-ld_objects/monster_sanctuary_video_game";
import { websiteURL } from '../../constants';

const MonsterTypeDetailsPageComponent: NextPage<{ monsterTypePageDetails: MonsterTypeDetailsPage | null }> = ({ monsterTypePageDetails }) => {
    const parents: ParentPage[] = [
        {
            pageName: "Monster Types",
            url: "/monster_types"
        }
    ];

    let webPageJSONLD: WithContext<WebPage> | null = null;

    if (monsterTypePageDetails) {
        const monsterSanctuaryVideoGameWithElementAttribute: VideoGame = {
            ...MonsterSanctuaryVideoGame,
            "characterAttribute": {
                "@type": "Thing",
                "name": `${monsterTypePageDetails.monsterTypeName} (Monster Type)`,
                "description": `The ${monsterTypePageDetails.monsterTypeName} monster type`,
            }
        }

        webPageJSONLD = {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "author": ExportedMonsterSanctuaryDataExplorerContributors,
            "name": monsterTypePageDetails.monsterTypeName,
            "description": `This page lists details for the ${monsterTypePageDetails.monsterTypeName} monster type in the Monster Sanctuary video game.`,
            "url": websiteURL + '/monster_types/' + monsterTypePageDetails.monsterTypeName,
            "about": monsterSanctuaryVideoGameWithElementAttribute,
            "isPartOf": ExportedMonsterSanctuaryDataExplorerWebsite
        }
    }


    return (
        <>
            {
                monsterTypePageDetails && webPageJSONLD &&
                <Layout pageName={monsterTypePageDetails.monsterTypeName} parents={parents} jsonldObject={webPageJSONLD}>
                    <p>This page lists details for the {monsterTypePageDetails.monsterTypeName} monster type in the Monster Sanctuary video game.</p>
                    <dl>
                        <dt>Name</dt>
                        <dd>{monsterTypePageDetails.monsterTypeName}</dd>

                        <dt>Monsters</dt>
                        <dd>
                            <ul>
                                {
                                    monsterTypePageDetails.monsters.map((monster) => {
                                        return (
                                            <li key={monster}>
                                                <Link href={'/monsters/' + monster}>{monster}</Link>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </dd>

                        <dt>Skills</dt>
                        <dd>
                            {
                                monsterTypePageDetails.skillDetailsWithMonstersList.map((skill) => {
                                    return <SkillDetailsWithMonstersListComponent key={skill.skillName} skillDetailsWithMonstersList={skill} />
                                })
                            }
                        </dd>
                    </dl>
                </Layout>
            }
        </>
    )
}

export const getStaticPaths: GetStaticPaths<{ name: string }> = async (context) => {

    let results: string[] = [];

    const dataClient = new ExportedMonsterSanctuaryDataClient();
    const monsterTypeEnumDetails = await dataClient.enumsClient.getObjectFromFileByFileNameAsync('EMonsterType');

    if (monsterTypeEnumDetails?.KeyValueObjects) {
        monsterTypeEnumDetails.KeyValueObjects.forEach((keyValueObject) => {
            results.push(keyValueObject.Key);
        })
    }

    return {
        fallback: false,
        paths: results.map((result) => {
            return {
                params: {
                    name: result
                }
            }
        })
    }
}

export const getStaticProps: GetStaticProps<{ monsterTypePageDetails: MonsterTypeDetailsPage | null }, { name: string }> = async (context) => {

    let results: MonsterTypeDetailsPage | null = null;

    if (context.params) {
        if (context.params.name) {

            const dataClient = new ExportedMonsterSanctuaryDataClient();
            const monsterTypeEnumDetails = await dataClient.enumsClient.getObjectFromFileByFileNameAsync('EMonsterType');

            if (monsterTypeEnumDetails) {
                const readAllEnumObjectPromises = monsterTypeEnumDetails.KeyValueObjects.map(async (enumKeyValueObject) => {
                    const monsterTypeName = enumKeyValueObject.Key;

                    if (context.params) {
                        if (context.params.name == monsterTypeName) {
                            let monsters: string[] = [];
                            let skills: SkillDetailsWithMonstersList[] = [];

                            const allMonsterObjects = await dataClient.monstersClient.getAllObjectsInDirectoryAsync();

                            allMonsterObjects.forEach((monster) => {
                                const extendedMonster = new ExtendedMonster(monster);

                                if (extendedMonster.isOfType(enumKeyValueObject.Value)) {
                                    monsters.push(monster.Name);
                                }

                                extendedMonster.extendedSkillsObject.extendedSkillsList.forEach((skill) => {

                                    if (skill.isRestrictedToType(enumKeyValueObject.Value)) {
                                        let indexOfSkill = -1;
                                        const currentSkillsLength = skills.length;

                                        for (let i = 0; i < currentSkillsLength; i++) {
                                            if (skills[i].skillName == skill.exportedSkillDetails.Name) {
                                                indexOfSkill = i;
                                                break;
                                            }
                                        }

                                        if (indexOfSkill == -1) {
                                            skills.push({
                                                skillName: skill.exportedSkillDetails.Name,
                                                skillDescription: skill.exportedSkillDetails.Description,
                                                monsters: []
                                            });

                                            indexOfSkill = currentSkillsLength;
                                        }

                                        skills[indexOfSkill].monsters.push(monster.Name);
                                    }
                                })
                            })

                            skills = skills.sort((a, b): number => {
                                if (a.skillName.toLocaleLowerCase() < b.skillName.toLocaleLowerCase()) {
                                    return -1;
                                }

                                if (a.skillName.toLocaleLowerCase() > b.skillName.toLocaleLowerCase()) {
                                    return 1;
                                }

                                return 0;
                            });

                            skills.forEach((skill) => {
                                skill.monsters = skill.monsters.sort();
                            });

                            results = {
                                monsterTypeName: monsterTypeName,
                                monsters: monsters.sort(),
                                skillDetailsWithMonstersList: skills,
                            }
                        }
                    }
                })

                await Promise.all(readAllEnumObjectPromises);
            }
        }
    }

    return {
        props: {
            monsterTypePageDetails: results
        }
    }

}

export default MonsterTypeDetailsPageComponent;