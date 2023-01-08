import ExportedMonsterSanctuaryDataClient from "@woodman231/exportedmonstermanctuarydataclient";
import { ExportedMonsterSanctuaryDataTypes } from "@woodman231/exportedmonstersanctuarydatatypes";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParentPage } from "../../components/layout";
import Layout from "../../components/layout";
import Link from "next/link";
import ExtendedMonster from "../../export_model_extensions/extended_monster";

interface SkillDetailsPageProps {
    name: string;
    description: string;
    monstersWithSkill: MonsterWithSkilLDetails[];
}

interface MonsterWithSkilLDetails {
    monsterName: string;
    skillDescription: string;
    quantity: number;
}

const SkillDetailsPage: NextPage<{skillDetails: SkillDetailsPageProps}> = ({skillDetails}) => {
    const parents: ParentPage[] = [
        {
            pageName: "Skills",
            url: "/skills"
        }
    ];

    return(
        <>
            <Layout pageName={skillDetails.name} parents={parents}>
                <p>This page lists details for the {skillDetails.name} skill in the Monster Sanctuary video game.</p>
                <dl>
                    <dt>Name</dt>
                    <dd>{skillDetails.name}</dd>

                    <dt>Description (Some descriptions may vary depending on the specific monster that has the skill)</dt>
                    <dd>{skillDetails.description}</dd>

                    <dt>Monsters with this skill</dt>
                    <dd>
                        <ul>
                            {
                                skillDetails.monstersWithSkill.map((monsterWithSkill, index) => {
                                    return(
                                        <li key={index}>
                                            <Link href={'/monsters/' + monsterWithSkill.monsterName}>{monsterWithSkill.monsterName}</Link>{' - '}{monsterWithSkill.skillDescription}{' x '}{monsterWithSkill.quantity}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </dd>

                </dl>
            </Layout>
        </>
    )
}

export const getStaticPaths: GetStaticPaths<{name: string}> = async (context) => {

    const dataClient = new ExportedMonsterSanctuaryDataClient();
    const allMonsters = await dataClient.monstersClient.getAllObjectsInDirectoryAsync();

    let results: string[] = [];

    allMonsters.forEach((monster) => {
        const extendedMonster = new ExtendedMonster(monster);
        extendedMonster.extendedSkillsObject.extendedSkillsList.forEach((skill) => {
            if(!results.includes(skill.exportedSkillDetails.Name)) {
                results.push(skill.exportedSkillDetails.Name);
            }
        })
    })

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

export const getStaticProps: GetStaticProps<{skillDetails: SkillDetailsPageProps}, {name: string}> = async (context) => {        

    let results: SkillDetailsPageProps = {
        name: "Unknown",
        description: "Unknown",
        monstersWithSkill: []
    };

    const dataClient = new ExportedMonsterSanctuaryDataClient();
    const allMonsters = await dataClient.monstersClient.getAllObjectsInDirectoryAsync();

    allMonsters.forEach((monster) => {
        const extendedMonster = new ExtendedMonster(monster);
        extendedMonster.extendedSkillsObject.extendedSkillsList.forEach((skill) => {
            if(context.params) {
                if(skill.exportedSkillDetails.Name === context.params.name) {
                    results.name = skill.exportedSkillDetails.Name;
                    results.description = skill.exportedSkillDetails.Description;

                    let indexOfMonsterWithSkill = -1;

                    const monstersWithSkillLength = results.monstersWithSkill.length;

                    for(let i=0; i<monstersWithSkillLength; i++) {
                        if(results.monstersWithSkill[i].monsterName === monster.Name) {
                            indexOfMonsterWithSkill = i;
                        }
                    }

                    if(indexOfMonsterWithSkill === -1) {
                        results.monstersWithSkill.push({
                            monsterName: monster.Name,
                            skillDescription: skill.exportedSkillDetails.Description,
                            quantity: 0
                        });

                        indexOfMonsterWithSkill = monstersWithSkillLength;
                    }

                    results.monstersWithSkill[indexOfMonsterWithSkill].quantity = results.monstersWithSkill[indexOfMonsterWithSkill].quantity + 1;
                    
                }
            }
        })
    })

    return {
        props: {
            skillDetails: results
        }
    }
}

export default SkillDetailsPage;