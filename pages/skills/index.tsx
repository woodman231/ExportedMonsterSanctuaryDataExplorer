import ExportedMonsterSanctuaryDataClient from "@woodman231/exportedmonstermanctuarydataclient";
import { GetStaticProps, NextPage } from "next";
import Layout from "../../components/layout";
import Link from "next/link";
import ExtendedMonster from "../../export_model_extensions/extended_monster";
import { WithContext, CollectionPage, VideoGame } from "schema-dts";
import { ExportedMonsterSanctuaryDataExplorerWebsite } from '../../json-ld_objects/exportedmonstersanctuarydataexplorer_website';
import { MonsterSanctuaryVideoGame } from "../../json-ld_objects/monster_sanctuary_video_game";
import { ExportedMonsterSanctuaryDataExplorerContributors } from "../../json-ld_objects/exportedmonstersanctuarydataexplorer_contributors_org";
import { websiteURL } from '../../constants';

const SkillsHomePage: NextPage<{ skillNames: string[] }> = ({ skillNames }) => {
    const monsterSanctuaryVideoGameWithSkillsAttribute: VideoGame = {
        ...MonsterSanctuaryVideoGame,
        "characterAttribute": {
            "@type": "Thing",
            "name": "Skills",
            "description": "Skills are various actions that monsters can learn in the Monster Sanctuary video game."
        }
    }

    const webPageJSONLD: WithContext<CollectionPage> = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "author": ExportedMonsterSanctuaryDataExplorerContributors,
        "name": "Skills",
        "description": "This page lists the skills that are available in the Monster Sanctuary video game.",
        "url": websiteURL + '/skills',
        "about": monsterSanctuaryVideoGameWithSkillsAttribute,
        "isPartOf": ExportedMonsterSanctuaryDataExplorerWebsite,
    }

    return (
        <>
            <Layout pageName="Basic Skills List" jsonldObject={webPageJSONLD}>
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