import ExportedMonsterSanctuaryDataClient from "@woodman231/exportedmonstermanctuarydataclient";
import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import Layout from "../../components/layout";
import { WithContext, CollectionPage, VideoGame } from "schema-dts";
import { ExportedMonsterSanctuaryDataExplorerWebsite } from '../../json-ld_objects/exportedmonstersanctuarydataexplorer_website';
import { MonsterSanctuaryVideoGame } from "../../json-ld_objects/monster_sanctuary_video_game";
import { ExportedMonsterSanctuaryDataExplorerContributors } from "../../json-ld_objects/exportedmonstersanctuarydataexplorer_contributors_org";
import { websiteURL } from '../../constants';

const BuffsHomePage: NextPage<{ buffNames: string[] }> = ({ buffNames }) => {

    const monsterSanctuaryVideoGameWithBuffsAttribute: VideoGame = {
        ...MonsterSanctuaryVideoGame,
        "characterAttribute": {
            "@type": "Thing",
            "name": "Buffs",
            "description": "Buffs are various abilities that make your monsters stronger."
        }
    }

    const webPageJSONLD: WithContext<CollectionPage> = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "author": ExportedMonsterSanctuaryDataExplorerContributors,
        "name": "Buffs",
        "description": "This page contains a list of Buffs that are available in the Monster Sanctuary video game.",
        "url": websiteURL + '/buffs',
        "about": monsterSanctuaryVideoGameWithBuffsAttribute,
        "isPartOf": ExportedMonsterSanctuaryDataExplorerWebsite,
    }

    return (
        <>
            <Layout pageName="Buffs" jsonldObject={webPageJSONLD}>
                <p>This page contains a list of Buffs that are available in the Monster Sanctuary video game.</p>
                <ul>
                    {
                        buffNames.map((buffName) => {
                            return (
                                <li key={buffName}>
                                    <Link href={'/buffs/' + buffName}>{buffName}</Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </Layout>
        </>
    )
}

export const getStaticProps: GetStaticProps<{ buffNames: string[] }> = async (context) => {
    let results: string[] = [];

    const dataClient = new ExportedMonsterSanctuaryDataClient();
    const buffTypeEnumDetails = await dataClient.enumsClient.getObjectFromFileByFileNameAsync('BuffType');

    if (buffTypeEnumDetails?.KeyValueObjects) {
        buffTypeEnumDetails.KeyValueObjects.forEach((keyValueObject) => {
            results.push(keyValueObject.Key);
        })
    }

    results = results.sort();

    return {
        props: {
            buffNames: results
        }
    }
}

export default BuffsHomePage;