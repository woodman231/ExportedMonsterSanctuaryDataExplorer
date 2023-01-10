import ExportedMonsterSanctuaryDataClient from "@woodman231/exportedmonstermanctuarydataclient";
import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import Layout from "../../components/layout";
import { WithContext, CollectionPage, VideoGame } from "schema-dts";
import { ExportedMonsterSanctuaryDataExplorerWebsite } from '../../json-ld_objects/exportedmonstersanctuarydataexplorer_website';
import { MonsterSanctuaryVideoGame } from "../../json-ld_objects/monster_sanctuary_video_game";
import { ExportedMonsterSanctuaryDataExplorerContributors } from "../../json-ld_objects/exportedmonstersanctuarydataexplorer_contributors_org";
import { websiteURL } from '../../constants';

const ElementsHomePage: NextPage<{ elementNames: string[] }> = ({ elementNames }) => {

    const monsterSanctuaryVideoGameWithElementsAttribute: VideoGame = {
        ...MonsterSanctuaryVideoGame,
        "characterAttribute": {
            "@type": "Thing",
            "name": "Elements",
            "description": "Elements refer to various natural elements which a monster may resist, be weak to, physically attack, or magically attack with."
        }
    }

    const webPageJSONLD: WithContext<CollectionPage> = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "author": ExportedMonsterSanctuaryDataExplorerContributors,
        "name": "Elements",
        "description": "This page contains a list of Elements that are available in the Monster Sanctuary video game.",
        "url": websiteURL + '/elements',
        "about": monsterSanctuaryVideoGameWithElementsAttribute,
        "isPartOf": ExportedMonsterSanctuaryDataExplorerWebsite,
    }

    return (
        <>
            <Layout pageName="Elements" jsonldObject={webPageJSONLD}>
                <p>This page contains a list of elements available in the Monster Sanctuary video game.</p>
                <ul>
                    {
                        elementNames.map((elementName) => {
                            return (
                                <li key={elementName}>
                                    <Link href={'/elements/' + elementName}>{elementName}</Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </Layout>
        </>
    )
}

export const getStaticProps: GetStaticProps<{ elementNames: string[] }> = async (context) => {
    let results: string[] = [];

    const dataClient = new ExportedMonsterSanctuaryDataClient();
    const elementTypeEnumDetails = await dataClient.enumsClient.getObjectFromFileByFileNameAsync('EElement');

    if (elementTypeEnumDetails?.KeyValueObjects) {
        elementTypeEnumDetails.KeyValueObjects.forEach((keyValueObject) => {
            results.push(keyValueObject.Key);
        })
    }

    results = results.sort();

    return {
        props: {
            elementNames: results
        }
    }
}

export default ElementsHomePage;