import { GetStaticProps, NextPage } from "next"
import Link from "next/link"
import Layout from "../../components/layout"
import ExportedMonsterSanctuaryDataClient from "@woodman231/exportedmonstermanctuarydataclient"
import { WithContext, CollectionPage } from "schema-dts"
import { ExportedMonsterSanctuaryDataExplorerWebsite } from '../../json-ld_objects/exportedmonstersanctuarydataexplorer_website'
import { ExportedMonsterSanctuaryDataExplorerContributors } from "../../json-ld_objects/exportedmonstersanctuarydataexplorer_contributors_org"
import { websiteURL } from '../../constants'

interface MonstersListHomePageProps {
    monsters: string[]
}

const MonstersListHomePage: NextPage<MonstersListHomePageProps> = ({ monsters }) => {

    const webPageJSONLD: WithContext<CollectionPage> = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "author": ExportedMonsterSanctuaryDataExplorerContributors,
        "name": "Basic Monsters List",
        "description": "This page contains a basic list of the monsters available in the Monster Sanctuary video game.",
        "url": websiteURL + '/monsters',
        "isPartOf": ExportedMonsterSanctuaryDataExplorerWebsite
    }

    return (
        <>
            <Layout pageName="Monsters" jsonldObject={webPageJSONLD}>
                <p>This page contains a basic list of the monsters available in the Monster Sanctuary video game.</p>
                <ul>
                    {
                        monsters.map((monster) => {
                            return (
                                <li key={monster}><Link href={'/monsters/' + monster}>{monster}</Link></li>
                            )
                        })
                    }
                </ul>
            </Layout>
        </>
    )
}

export const getStaticProps: GetStaticProps<MonstersListHomePageProps> = async (context) => {
    const dataClient = new ExportedMonsterSanctuaryDataClient();
    const fileNames = await dataClient.monstersClient.getAllFileNamesAsync();

    return {
        props: {
            monsters: fileNames
        }
    }
}

export default MonstersListHomePage