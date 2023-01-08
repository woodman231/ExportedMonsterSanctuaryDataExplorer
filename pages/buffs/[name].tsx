import ExportedMonsterSanctuaryDataClient from "@woodman231/exportedmonstermanctuarydataclient";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Layout, { ParentPage } from "../../components/layout";
import SkillDetailsWithMonstersListComponent from "../../components/skill_details_with_monsters_list";
import { SkillDetailsWithMonstersList } from "../../component_view_models/skill_details_wtih_monsters_list";
import ExtendedMonster from "../../export_model_extensions/extended_monster";

interface BuffTypeDetailsPageProps {
    buffName: string;
    buffDescription: string;
    skillsWithMonstersList: SkillDetailsWithMonstersList[];
}

const BuffDetailsPage: NextPage<{ buffDetails: BuffTypeDetailsPageProps | null }> = ({ buffDetails }) => {
    const parents: ParentPage[] = [
        {
            pageName: 'Buffs',
            url: '/buffs'
        }
    ];

    return (
        <>
            {
                buffDetails &&
                <Layout pageName={buffDetails.buffName} parents={parents}>
                    <p>This page lists details for the {buffDetails.buffName} Buff in the Monster Sanctuary video game.</p>
                    <dl>
                        <dt>Name</dt>
                        <dd>{buffDetails.buffName}</dd>

                        <dt>Description</dt>
                        <dd>{buffDetails.buffDescription}</dd>

                        <dt>Skills</dt>
                        <dd>
                            {
                                buffDetails.skillsWithMonstersList.map((skillWithMonstersList) => {
                                    return <SkillDetailsWithMonstersListComponent key={skillWithMonstersList.skillName} skillDetailsWithMonstersList={skillWithMonstersList} />
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
    const buffTypeEnumDetails = await dataClient.enumsClient.getObjectFromFileByFileNameAsync('BuffType');

    if (buffTypeEnumDetails) {
        if (buffTypeEnumDetails.KeyValueObjects) {
            results = buffTypeEnumDetails.KeyValueObjects.map((keyVlueObject) => {
                return keyVlueObject.Key
            });
        }

        results = results.sort();
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

export const getStaticProps: GetStaticProps<{ buffDetails: BuffTypeDetailsPageProps | null }, { name: string }> = async (context) => {
    let results: BuffTypeDetailsPageProps | null = null;

    if (context.params) {
        if (context.params.name) {

            const dataClient = new ExportedMonsterSanctuaryDataClient();
            const buffTypeEnumDetails = await dataClient.enumsClient.getObjectFromFileByFileNameAsync('BuffType');

            if (buffTypeEnumDetails) {
                const readAllEnumObjectPromises = buffTypeEnumDetails.KeyValueObjects.map(async (keyValueObject) => {
                    const buffTypeName = keyValueObject.Key;
                    let buffTypeDescription = '';

                    if (context.params) {
                        if (context.params.name == buffTypeName) {
                            let skillsWithMonstersList: SkillDetailsWithMonstersList[] = [];

                            const buffTypeObject = await dataClient.buffsClient.getObjectByNameAsync(buffTypeName);

                            if(buffTypeObject) {
                                buffTypeDescription = buffTypeObject.Description;
                            }

                            const allMonsterObjects = await dataClient.monstersClient.getAllObjectsInDirectoryAsync();

                            allMonsterObjects.forEach((monster) => {
                                const extendedMonster = new ExtendedMonster(monster);
                                extendedMonster.extendedSkillsObject.extendedSkillsList.forEach((skill) => {
                                    if (skill.hasOverlayBuff(keyValueObject.Value)) {
                                        let indexOfCurrentSkill = -1;
                                        const currentSkillsLength = skillsWithMonstersList.length;

                                        for (let i = 0; i < currentSkillsLength; i++) {
                                            if (skillsWithMonstersList[i].skillName == skill.exportedSkillDetails.Name) {
                                                indexOfCurrentSkill = i;
                                                break;
                                            }
                                        }

                                        if (indexOfCurrentSkill === -1) {
                                            skillsWithMonstersList.push({
                                                skillName: skill.exportedSkillDetails.Name,
                                                skillDescription: skill.exportedSkillDetails.Description,
                                                monsters: []
                                            });

                                            indexOfCurrentSkill = currentSkillsLength;
                                        }

                                        if (!skillsWithMonstersList[indexOfCurrentSkill].monsters.includes(monster.Name)) {
                                            skillsWithMonstersList[indexOfCurrentSkill].monsters.push(monster.Name);
                                        }
                                    }
                                })
                            })

                            skillsWithMonstersList = skillsWithMonstersList.sort((a, b): number => {
                                if (a.skillName.toLocaleLowerCase() < b.skillName.toLocaleLowerCase()) {
                                    return -1;
                                }

                                if (a.skillName.toLocaleLowerCase() > b.skillName.toLocaleLowerCase()) {
                                    return 1;
                                }

                                return 0;
                            });

                            skillsWithMonstersList.forEach((skill) => {
                                skill.monsters = skill.monsters.sort();
                            });

                            results = {
                                buffName: buffTypeName,
                                buffDescription: buffTypeDescription,
                                skillsWithMonstersList: skillsWithMonstersList
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
            buffDetails: results
        }
    }
}

export default BuffDetailsPage;