import ExportedMonsterSanctuaryDataClient from "@woodman231/exportedmonstermanctuarydataclient";
import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import Layout from "../../components/layout";

const ElementsHomePage: NextPage<{ elementNames: string[] }> = ({ elementNames }) => {
    return (
        <>
            <Layout pageName="Elements">
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

export const getStaticProps : GetStaticProps<{elementNames: string[]}> = async (context) => {
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