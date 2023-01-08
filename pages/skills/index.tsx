import ExportedMonsterSanctuaryDataClient from "@woodman231/exportedmonstermanctuarydataclient";
import { ExportedMonsterSanctuaryDataTypes } from "@woodman231/exportedmonstersanctuarydatatypes";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParentPage } from "../../components/layout";
import Layout from "../../components/layout";
import Link from "next/link";
import ExtendedMonster from "../../export_model_extensions/extended_monster";

const SkillsHomePage: NextPage<{ skillNames: string[] }> = ({ skillNames }) => {
    return (
        <>
            <Layout pageName="Basic Skills List">
                <p>This page lists the skills that are available in the Monster Sanctuary video game.</p>
                <ul>
                    {
                        skillNames.map((skillName, index) => {
                            return (
                                <li key={index}>
                                    <Link href={'/skills/' + skillName}>{skillName}</Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </Layout>
        </>
    )
}

export const getStaticProps: GetStaticProps<{ skillNames: string[] }> = async (context) => {
    let results: string[] = [];

    const dataClient = new ExportedMonsterSanctuaryDataClient();
    const allMonsters = await dataClient.monstersClient.getAllObjectsInDirectoryAsync();

    allMonsters.forEach((monster) => {
        const extendedMonster = new ExtendedMonster(monster);
        extendedMonster.extendedSkillsObject.extendedSkillsList.forEach((extendedSkill) => {
            if(!results.includes(extendedSkill.exportedSkillDetails.Name)) {
                results.push(extendedSkill.exportedSkillDetails.Name);
            }
        })
    });

    results = results.sort();

    return {
        props: {
            skillNames: results
        }
    }
}

export default SkillsHomePage;