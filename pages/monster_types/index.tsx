import React from "react";
import { GetStaticProps, NextPage } from "next";
import ExportedMonsterSanctuaryDataClient from "@woodman231/exportedmonstermanctuarydataclient";
import Layout from "../../components/layout";
import Link from "next/link";

const MonsterTypesListHomePage: NextPage<{ monsterTypes: string[] }> = ({ monsterTypes }) => {
    return (
        <Layout pageName="Monster Types">
            <p>This page contains a list of Monster Types in the Monster Sanctuary video game.</p>
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