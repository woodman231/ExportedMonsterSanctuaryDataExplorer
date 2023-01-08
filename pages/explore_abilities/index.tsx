import ExportedMonsterSanctuaryDataClient from "@woodman231/exportedmonstermanctuarydataclient";
import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import Layout from "../../components/layout";

const ExploreAbilitiesHomePage: NextPage<{ explorerAbilityNames: string[] }> = ({ explorerAbilityNames }) => {
    return (
        <>
            <Layout pageName="Explore Abilities">
                <p>This page lists Explore Abilities that are available in the Monster Sanctuary video game.</p>
                <ul>
                    {
                        explorerAbilityNames.map((exploreAbility, index) => {
                            return (
                                <li key={index}>
                                    <Link href={'/explore_abilities/' + exploreAbility}>{exploreAbility}</Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </Layout>
        </>
    )
}

export const getStaticProps: GetStaticProps<{explorerAbilityNames: string[]}> = async (context) => {
    let results: string[] = [];

    const dataClient = new ExportedMonsterSanctuaryDataClient();
    const allMonsters = await dataClient.monstersClient.getAllObjectsInDirectoryAsync();

    allMonsters.forEach((monster) => {
        if(!results.includes(monster.ExploreAbilityName)) {
            results.push(monster.ExploreAbilityName);
        }
    });
    
    results = results.sort();

    return {
        props: {
            explorerAbilityNames: results
        }
    }
}

export default ExploreAbilitiesHomePage;