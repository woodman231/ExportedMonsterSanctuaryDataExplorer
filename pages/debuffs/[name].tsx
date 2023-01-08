import ExportedMonsterSanctuaryDataClient from "@woodman231/exportedmonstermanctuarydataclient";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Layout, { ParentPage } from "../../components/layout";
import SkillDetailsWithMonstersListComponent from "../../components/skill_details_with_monsters_list";
import { SkillDetailsWithMonstersList } from "../../component_view_models/skill_details_wtih_monsters_list";
import ExtendedMonster from "../../export_model_extensions/extended_monster";

interface DebuffTypeDetailsPageProps {
    debuffName: string;
    debuffDescription: string;
    skillsWithMonstersList: SkillDetailsWithMonstersList[];
}

const DebuffDetailsPage: NextPage<{ debuffDetails: DebuffTypeDetailsPageProps | null }> = ({ debuffDetails }) => {
    const parents: ParentPage[] = [
        {
            pageName: 'Debuffs',
            url: '/debuffs'
        }
    ];

    return (
        <>
            {
                debuffDetails &&
                <Layout pageName={debuffDetails.debuffName} parents={parents}>
                    <p>This page lists details for the {debuffDetails.debuffName} Debuff in the Monster Sanctuary video game.</p>
                    <dl>
                        <dt>Name</dt>
                        <dd>{debuffDetails.debuffName}</dd>

                        <dt>Description</dt>
                        <dd>{debuffDetails.debuffDescription}</dd>

                        <dt>Skills</dt>
                        <dd>
                            {
                                debuffDetails.skillsWithMonstersList.map((skillWithMonstersList) => {
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
    const buffTypeEnumDetails = await dataClient.enumsClient.getObjectFromFileByFileNameAsync('DebuffType');

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

export const getStaticProps: GetStaticProps<{ debuffDetails: DebuffTypeDetailsPageProps | null }, { name: string }> = async (context) => {
    let results: DebuffTypeDetailsPageProps | null = null;

    if (context.params) {
        if (context.params.name) {

            const dataClient = new ExportedMonsterSanctuaryDataClient();
            const buffTypeEnumDetails = await dataClient.enumsClient.getObjectFromFileByFileNameAsync('DebuffType');

            if (buffTypeEnumDetails) {
                const readAllEnumObjectPromises = buffTypeEnumDetails.KeyValueObjects.map(async (keyValueObject) => {
                    const debuffTypeName = keyValueObject.Key;
                    let debuffTypeDescription = '';

                    if (context.params) {
                        if (context.params.name == debuffTypeName) {
                            let skillsWithMonstersList: SkillDetailsWithMonstersList[] = [];

                            const debuffObject = await dataClient.debuffsClient.getObjectByNameAsync(debuffTypeName);

                            if(debuffObject) {
                                debuffTypeDescription = debuffObject.Description;
                            }

                            const allMonsterObjects = await dataClient.monstersClient.getAllObjectsInDirectoryAsync();

                            allMonsterObjects.forEach((monster) => {
                                const extendedMonster = new ExtendedMonster(monster);
                                extendedMonster.extendedSkillsObject.extendedSkillsList.forEach((skill) => {
                                    if (skill.hasOverlayDebuff(keyValueObject.Value)) {
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
                                debuffName: debuffTypeName,
                                debuffDescription: debuffTypeDescription,
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
            debuffDetails: results
        }
    }
}

export default DebuffDetailsPage;