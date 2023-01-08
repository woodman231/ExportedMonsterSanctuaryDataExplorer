import ExportedMonsterSanctuaryDataClient from "@woodman231/exportedmonstermanctuarydataclient";
import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import Layout from "../../components/layout";

const SpecialBuffsHomePage: NextPage<{ specialBuffs: string[] }> = ({ specialBuffs }) => {
    return (
        <>
            <Layout pageName="Special Buffs">
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