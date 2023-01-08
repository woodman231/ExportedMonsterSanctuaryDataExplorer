import ExportedMonsterSanctuaryDataClient from "@woodman231/exportedmonstermanctuarydataclient";
import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import Layout, { ParentPage } from "../../components/layout";
import { SkillDetailsWithMonstersList } from "../../component_view_models/skill_details_wtih_monsters_list";
import SkillDetailsWithMonstersListComponent from "../../components/skill_details_with_monsters_list";
import ExtendedMonster from "../../export_model_extensions/extended_monster";

interface SpecialBuffDetailsPageProps {
    name: string;
    description: string;
    skillDetailsWithMonstersList: SkillDetailsWithMonstersList[]
}

const SpecialBuffDetailsPage: NextPage<{ specialBuffDetails: SpecialBuffDetailsPageProps | null }> = ({ specialBuffDetails }) => {
    const parents: ParentPage[] = [
        {
            pageName: 'Special Buffs',
            url: '/special_buffs'
        }
    ];

    return (
        <>
            {
                specialBuffDetails &&
                <Layout pageName={specialBuffDetails.name} parents={parents}>
                    <p>This page lists the details for the {specialBuffDetails.name} Special Buff in the Monster Sanctuary video game.</p>
                    <dl>
                        <dt>Name</dt>
                        <dd>{specialBuffDetails.name}</dd>

                        <dt>Description</dt>
                        <dd>{specialBuffDetails.description}</dd>

                        <dt>Skills</dt>
                        <dd>
                            {
                                specialBuffDetails.skillDetailsWithMonstersList.map((skillWithMonstersList) => {
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
    const specialbuffTypeEnumDetails = await dataClient.enumsClient.getObjectFromFileByFileNameAsync('ESpecialBuff');

    if (specialbuffTypeEnumDetails) {
        if (specialbuffTypeEnumDetails.KeyValueObjects) {
            specialbuffTypeEnumDetails.KeyValueObjects.forEach((keyValueObject) => {
                results.push(keyValueObject.Key);
            })
        }
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

export const getStaticProps: GetStaticProps<{ specialBuffDetails: SpecialBuffDetailsPageProps | null }, { name: string }> = async (context) => {
    let results: SpecialBuffDetailsPageProps | null = null;

    if (context.params) {
        if (context.params.name) {
            const dataClient = new ExportedMonsterSanctuaryDataClient();
            const specialbuffTypeEnumDetails = await dataClient.enumsClient.getObjectFromFileByFileNameAsync('ESpecialBuff');

            if (specialbuffTypeEnumDetails) {
                if (specialbuffTypeEnumDetails.KeyValueObjects) {
                    const readAllEnumObjectPromises = specialbuffTypeEnumDetails.KeyValueObjects.map(async (keyValueObject) => {
                        const specialBuffName = keyValueObject.Key;
                        let specialBuffDescription = '';

                        if (context.params) {
                            if (context.params.name === specialBuffName) {
                                let skillsWithMonstersList: SkillDetailsWithMonstersList[] = [];

                                const specialBuffObject = await dataClient.specialBuffsClient.getObjectByNameAsync(specialBuffName);

                                if (specialBuffObject) {
                                    specialBuffDescription = specialBuffObject.Description;
                                }

                                const allMonsterObjects = await dataClient.monstersClient.getAllObjectsInDirectoryAsync();

                                allMonsterObjects.forEach((monster) => {
                                    const extendedMonster = new ExtendedMonster(monster);
                                    extendedMonster.extendedSkillsObject.extendedSkillsList.forEach((skill) => {
                                        if (skill.hasOverlaySpecialBuff(keyValueObject.Value)) {
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
                                    name: specialBuffName,
                                    description: specialBuffDescription,
                                    skillDetailsWithMonstersList: skillsWithMonstersList
                                };
                            }
                        }
                    })

                    await Promise.all(readAllEnumObjectPromises);
                }
            }

        }
    }


    return {
        props: {
            specialBuffDetails: results
        }
    }
}

export default SpecialBuffDetailsPage;