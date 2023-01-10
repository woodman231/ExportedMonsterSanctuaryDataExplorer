import ExportedMonsterSanctuaryDataClient from "@woodman231/exportedmonstermanctuarydataclient";
import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import Layout from "../../components/layout";
import { WithContext, CollectionPage, VideoGame } from "schema-dts";
import { ExportedMonsterSanctuaryDataExplorerWebsite } from '../../json-ld_objects/exportedmonstersanctuarydataexplorer_website';
import { MonsterSanctuaryVideoGame } from "../../json-ld_objects/monster_sanctuary_video_game";
import { ExportedMonsterSanctuaryDataExplorerContributors } from "../../json-ld_objects/exportedmonstersanctuarydataexplorer_contributors_org";
import { websiteURL } from '../../constants';

const ExploreAbilitiesHomePage: NextPage<{ explorerAbilityNames: string[] }> = ({ explorerAbilityNames }) => {
    const monsterSanctuaryVideoGameWithExploreAbilitiesAttribute: VideoGame = {
        ...MonsterSanctuaryVideoGame,
        "characterAttribute": {
            "@type": "Thing",
            "name": "Explore Abilities",
            "description": "Explore abilities have your monster help your hero get to hard to reach places."
        }
    }

    const webPageJSONLD: WithContext<CollectionPage> = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "author": ExportedMonsterSanctuaryDataExplorerContributors,
        "name": "Explore Abilities",
        "description": "This page contains a list of Explore Abilities that are available in the Monster Sanctuary video game.",
        "url": websiteURL + '/explore_abilities',
        "about": monsterSanctuaryVideoGameWithExploreAbilitiesAttribute,
        "isPartOf": ExportedMonsterSanctuaryDataExplorerWebsite,
    }

    return (
        <>
            <Layout pageName="Explore Abilities" jsonldObject={webPageJSONLD}>
                <p>This page lists Explore Abilities that are available in the Monster Sanctuary video game.</p>
                <ul>
                    {
                        explorerAbilityNames.map((exploreAbility, index) => {
                            return (
                                <li key={index}>
                                    <Link href={'/explore_abilities/' + exploreAbility}>{exploreAbility}</Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </Layout>
        </>
    )
}

export const getStaticProps: GetStaticProps<{ explorerAbilityNames: string[] }> = async (context) => {
    let results: string[] = [];

    const dataClient = new ExportedMonsterSanctuaryDataClient();
    const allMonsters = await dataClient.monstersClient.getAllObjectsInDirectoryAsync();

    allMonsters.forEach((monster) => {
        if (!results.includes(monster.ExploreAbilityName)) {
            results.push(monster.ExploreAbilityName);
        }
    });

    results = results.sort();

    return {
        props: {
            explorerAbilityNames: results
        }
    }
}

export default ExploreAbilitiesHomePage;