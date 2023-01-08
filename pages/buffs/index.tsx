import ExportedMonsterSanctuaryDataClient from "@woodman231/exportedmonstermanctuarydataclient";
import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import Layout from "../../components/layout";

const BuffsHomePage: NextPage<{ buffNames: string[] }> = ({ buffNames }) => {
    return (
        <>
            <Layout pageName="Buffs">
                <p>This page contains a list of Buffs available in the Monster Sanctuary video game.</p>
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