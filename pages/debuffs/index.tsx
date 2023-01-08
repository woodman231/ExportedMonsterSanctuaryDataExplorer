import ExportedMonsterSanctuaryDataClient from "@woodman231/exportedmonstermanctuarydataclient";
import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import Layout from "../../components/layout";

const BuffsHomePage: NextPage<{ debuffNames: string[] }> = ({ debuffNames }) => {
    return (
        <>
            <Layout pageName="Debuffs">
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