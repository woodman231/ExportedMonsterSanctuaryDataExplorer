import ExportedMonsterSanctuaryDataClient from "@woodman231/exportedmonstermanctuarydataclient";
import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import Layout from "../../components/layout";
import { WithContext, CollectionPage, VideoGame } from "schema-dts";
import { ExportedMonsterSanctuaryDataExplorerWebsite } from '../../json-ld_objects/exportedmonstersanctuarydataexplorer_website';
import { MonsterSanctuaryVideoGame } from "../../json-ld_objects/monster_sanctuary_video_game";
import { ExportedMonsterSanctuaryDataExplorerContributors } from "../../json-ld_objects/exportedmonstersanctuarydataexplorer_contributors_org";
import { websiteURL } from '../../constants';

const BuffsHomePage: NextPage<{ debuffNames: string[] }> = ({ debuffNames }) => {
    const monsterSanctuaryVideoGameWithDebuffsAttribute: VideoGame = {
        ...MonsterSanctuaryVideoGame,
        "characterAttribute": {
            "@type": "Thing",
            "name": "Debuffs",
            "description": "Debuffs are various abilities that make your monsters cast on other monsters to make their opponents weaker."
        }
    }

    const webPageJSONLD: WithContext<CollectionPage> = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "author": ExportedMonsterSanctuaryDataExplorerContributors,
        "name": "Debuffs",
        "description": "This page contains a list of Debuffs that are available in the Monster Sanctuary video game.",
        "url": websiteURL + '/debuffs',
        "about": monsterSanctuaryVideoGameWithDebuffsAttribute,
        "isPartOf": ExportedMonsterSanctuaryDataExplorerWebsite,
    }

    return (
        <>
            <Layout pageName="Debuffs" jsonldObject={webPageJSONLD}>
                <p>This page contains a list of Debuffs available in the Monster Sanctuary video game.</p>
                <ul>
                    {
                        debuffNames.map((debuffName) => {
                            return (
                                <li key={debuffName}>
                                    <Link href={'/debuffs/' + debuffName}>{debuffName}</Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </Layout>
        </>
    )
}

export const getStaticProps : GetStaticProps<{debuffNames: string[]}> = async (context) => {
    let results: string[] = [];

    const dataClient = new ExportedMonsterSanctuaryDataClient();
    const debuffTypeEnumDetails = await dataClient.enumsClient.getObjectFromFileByFileNameAsync('DebuffType');

    if (debuffTypeEnumDetails?.KeyValueObjects) {
        debuffTypeEnumDetails.KeyValueObjects.forEach((keyValueObject) => {
            results.push(keyValueObject.Key);
        })
    }

    results = results.sort();

    return {
        props: {
            debuffNames: results
        }
    }    
}

export default BuffsHomePage;