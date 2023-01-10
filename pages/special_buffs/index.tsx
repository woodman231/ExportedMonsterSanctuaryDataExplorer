import ExportedMonsterSanctuaryDataClient from "@woodman231/exportedmonstermanctuarydataclient";
import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import Layout from "../../components/layout";
import { WithContext, CollectionPage, VideoGame } from "schema-dts";
import { ExportedMonsterSanctuaryDataExplorerWebsite } from '../../json-ld_objects/exportedmonstersanctuarydataexplorer_website';
import { MonsterSanctuaryVideoGame } from "../../json-ld_objects/monster_sanctuary_video_game";
import { ExportedMonsterSanctuaryDataExplorerContributors } from "../../json-ld_objects/exportedmonstersanctuarydataexplorer_contributors_org";
import { websiteURL } from '../../constants';

const SpecialBuffsHomePage: NextPage<{ specialBuffs: string[] }> = ({ specialBuffs }) => {
    const monsterSanctuaryVideoGameWithSpecialBuffsAttribute: VideoGame = {
        ...MonsterSanctuaryVideoGame,
        "characterAttribute": {
            "@type": "Thing",
            "name": "Special Buffs",
            "description": "Special Buffs are various abilities that make your monsters stronger or can make other monsters weaker depending on the type of Special Buff."
        }
    }

    const webPageJSONLD: WithContext<CollectionPage> = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "author": ExportedMonsterSanctuaryDataExplorerContributors,
        "name": "Special Buffs",
        "description": "This page contains a list of Buffs that are available in the Monster Sanctuary video game.",
        "url": websiteURL + '/special_buffs',
        "about": monsterSanctuaryVideoGameWithSpecialBuffsAttribute,
        "isPartOf": ExportedMonsterSanctuaryDataExplorerWebsite,
    }

    return (
        <>
            <Layout pageName="Special Buffs" jsonldObject={webPageJSONLD}>
                <p>This page gives a list of the Special Buffs that are available in the Monster Sanctuary video game.</p>
                <ul>
                    {
                        specialBuffs.map((specialBuff, index) => {
                            return (
                                <li key={index}>
                                    <Link href={'/special_buffs/' + specialBuff}>{specialBuff}</Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </Layout>
        </>
    )
}

export const getStaticProps: GetStaticProps<{specialBuffs: string[]}> = async (context) => {    

    const dataClient = new ExportedMonsterSanctuaryDataClient();
    const specialBuffTypeEnumDetails = await dataClient.enumsClient.getObjectFromFileByFileNameAsync('ESpecialBuff');

    let results: string[] = [];

    if (specialBuffTypeEnumDetails?.KeyValueObjects) {
        specialBuffTypeEnumDetails.KeyValueObjects.forEach((keyValueObject) => {
            results.push(keyValueObject.Key);
        })
    }

    results = results.sort();

    return {
        props: {
            specialBuffs: results
        }
    }
}

export default SpecialBuffsHomePage;