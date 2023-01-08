import { GetStaticProps, NextPage } from "next"
import Link from "next/link"
import Layout from "../../components/layout"
import ExportedMonsterSanctuaryDataClient from "@woodman231/exportedmonstermanctuarydataclient"

interface MonstersListHomePageProps {
    monsters: string[]
}

const MonstersListHomePage: NextPage<MonstersListHomePageProps> = ({monsters}) => {
    return(
        <>
            <Layout pageName="Monsters">
                <p>This page contains a basic list of the monsters available in the Monster Sanctuary video game.</p>
                <ul>
                    {
                        monsters.map((monster) => {
                            return(
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