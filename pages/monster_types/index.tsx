import React from "react";
import { GetStaticProps, NextPage } from "next";
import ExportedMonsterSanctuaryDataClient from "@woodman231/exportedmonstermanctuarydataclient";
import Layout from "../../components/layout";
import Link from "next/link";
import { WithContext, CollectionPage, VideoGame } from "schema-dts";
import { ExportedMonsterSanctuaryDataExplorerWebsite } from '../../json-ld_objects/exportedmonstersanctuarydataexplorer_website';
import { MonsterSanctuaryVideoGame } from "../../json-ld_objects/monster_sanctuary_video_game";
import { ExportedMonsterSanctuaryDataExplorerContributors } from "../../json-ld_objects/exportedmonstersanctuarydataexplorer_contributors_org";
import { websiteURL } from '../../constants';

const MonsterTypesListHomePage: NextPage<{ monsterTypes: string[] }> = ({ monsterTypes }) => {
    const monsterSanctuaryVideoGameWithMonsterTypesAttribute: VideoGame = {
        ...MonsterSanctuaryVideoGame,
        "characterAttribute": {
            "@type": "Thing",
            "name": "Monster Types",
            "description": "Monster Types specify what types a monster qualifies for in order to provide or receive special spells for similar monsters of the same type."
        }
    }

    const webPageJSONLD: WithContext<CollectionPage> = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "author": ExportedMonsterSanctuaryDataExplorerContributors,
        "name": "Monster Types",
        "description": "This page contains a list of Monster Types that are available in the Monster Sanctuary video game.",
        "url": websiteURL + '/monster_types',
        "about": monsterSanctuaryVideoGameWithMonsterTypesAttribute,
        "isPartOf": ExportedMonsterSanctuaryDataExplorerWebsite,
    }

    return (
        <Layout pageName="Monster Types" jsonldObject={webPageJSONLD}>
            <p>This page contains a list of Monster Types that are available in the Monster Sanctuary video game.</p>
            <ul>
                {
                    monsterTypes.map((monsterType) => {
                        return (
                            <li key={monsterType}><Link href={'/monster_types/' + monsterType}>{monsterType}</Link></li>
                        )
                    })
                }
            </ul>
        </Layout>
    )
}

export const getStaticProps: GetStaticProps<{ monsterTypes: string[] }> = async (context) => {
    let results: string[] = [];

    const dataClient = new ExportedMonsterSanctuaryDataClient();
    const monsterTypeEnumDetails = await dataClient.enumsClient.getObjectFromFileByFileNameAsync('EMonsterType');

    if (monsterTypeEnumDetails?.KeyValueObjects) {
        monsterTypeEnumDetails.KeyValueObjects.forEach((keyValueObject) => {
            results.push(keyValueObject.Key);
        })
    }

    results = results.sort();

    return {
        props: {
            monsterTypes: results
        }
    }
}

export default MonsterTypesListHomePage;