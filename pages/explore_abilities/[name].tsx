import ExportedMonsterSanctuaryDataClient from "@woodman231/exportedmonstermanctuarydataclient";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import Layout, { ParentPage } from "../../components/layout";
import { WithContext, WebPage, VideoGame, CollectionPage } from "schema-dts";
import { ExportedMonsterSanctuaryDataExplorerWebsite } from '../../json-ld_objects/exportedmonstersanctuarydataexplorer_website';
import { ExportedMonsterSanctuaryDataExplorerContributors } from "../../json-ld_objects/exportedmonstersanctuarydataexplorer_contributors_org";
import { MonsterSanctuaryVideoGame } from "../../json-ld_objects/monster_sanctuary_video_game";
import { websiteURL } from '../../constants';

interface ExploreAbilityDetailsPageProps {
    name: string;
    description: string;
    monsters: string[];
}

const ExploreAbilityDetailsPage: NextPage<{ exploreAbilityDetails: ExploreAbilityDetailsPageProps }> = ({ exploreAbilityDetails }) => {
    const parents: ParentPage[] = [
        {
            pageName: 'Explore Abilities',
            url: '/explore_abilities'
        }
    ];

    const monsterSanctuaryVideoGameWithElementAttribute: VideoGame = {
        ...MonsterSanctuaryVideoGame,
        "characterAttribute": {
            "@type": "Thing",
            "name": `${exploreAbilityDetails.name} (Explore Ability)`,
            "description": exploreAbilityDetails.description,
        }
    }

    const webPageJSONLD: WithContext<WebPage> = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "author": ExportedMonsterSanctuaryDataExplorerContributors,
        "name": exploreAbilityDetails.name,
        "description": `This page lists details for the ${exploreAbilityDetails.name} exploration ability in the Monster Sanctuary video game.`,
        "url": websiteURL + '/explore_abilities/' + exploreAbilityDetails.name,
        "about": monsterSanctuaryVideoGameWithElementAttribute,
        "isPartOf": ExportedMonsterSanctuaryDataExplorerWebsite
    }

    return (
        <>
            <Layout pageName={exploreAbilityDetails.name} parents={parents} jsonldObject={webPageJSONLD}>
                <p>This page lists details for the {exploreAbilityDetails.name} exploration ability in the Monster Sanctuary video game.</p>
                <dl>
                    <dt>Name</dt>
                    <dd>{exploreAbilityDetails.name}</dd>

                    <dt>Description</dt>
                    <dd>{exploreAbilityDetails.description}</dd>

                    <dt>Monsters with the {exploreAbilityDetails.name} exploration ability</dt>
                    <dd>
                        <ul>
                            {
                                exploreAbilityDetails.monsters.map((monster, index) => {
                                    return (
                                        <li key={index}>
                                            <Link href={'/monsters/' + monster}>{monster}</Link>
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

export const getStaticPaths: GetStaticPaths<{ name: string }> = async (context) => {
    const dataClient = new ExportedMonsterSanctuaryDataClient();
    const allMonsters = await dataClient.monstersClient.getAllObjectsInDirectoryAsync();

    let results: string[] = [];
    allMonsters.forEach((monster) => {
        if (!results.includes(monster.ExploreAbilityName)) {
            results.push(monster.ExploreAbilityName);
        }
    });

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

export const getStaticProps: GetStaticProps<{ exploreAbilityDetails: ExploreAbilityDetailsPageProps }, { name: string }> = async (context) => {
    let results: ExploreAbilityDetailsPageProps = {
        name: 'Unknow',
        description: 'Unknown',
        monsters: []
    };

    const dataClient = new ExportedMonsterSanctuaryDataClient();
    const allMonsters = await dataClient.monstersClient.getAllObjectsInDirectoryAsync();

    allMonsters.forEach((monster) => {
        if (context.params) {
            if (monster.ExploreAbilityName === context.params.name) {
                results.name = monster.ExploreAbilityName;
                results.description = monster.ExploreAbilityDescription;

                if (!results.monsters.includes(monster.Name)) {
                    results.monsters.push(monster.Name);
                }
            }
        }
    })

    results.monsters = results.monsters.sort();

    return {
        props: {
            exploreAbilityDetails: results
        }
    }
}

export default ExploreAbilityDetailsPage;