import ExportedMonsterSanctuaryDataClient from "@woodman231/exportedmonstermanctuarydataclient/";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import Layout, { ParentPage } from "../../components/layout";
import ExtendedMonster from "../../export_model_extensions/extended_monster";

interface ElementDetailsPageProps {
    elementName: string;
    monstersThatResistThisElement: string[];
    monstersThatAreWeakAgainstThisElement: string[];
    monstersThatPhysicallyAttackWithThisElement: string[];
    monstersThatMagicallyAttackWithThisElement: string[];
}

const ElementDetailsPage: NextPage<{ elementDetails: ElementDetailsPageProps | null }> = ({ elementDetails }) => {
    const parents: ParentPage[] = [
        {
            pageName: "Elements",
            url: "/elements"
        }
    ];
        
    return (
        <>
            {
                elementDetails &&
                <Layout pageName={'Element Details - ' + elementDetails.elementName} parents={parents}>
                    <p>This page lists details for the {elementDetails.elementName} element in the Monster Sanctuary video game.</p>
                    <dl>
                        <dt>Name</dt>
                        <dd>{elementDetails.elementName}</dd>

                        <dt>Monsters that resist {elementDetails.elementName}</dt>
                        <dd>
                            <ul>
                                {
                                    elementDetails.monstersThatResistThisElement.map((monster) => {
                                        return (
                                            <li key={monster}>
                                                <Link href={'/monsters/' + monster}>{monster}</Link>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </dd>

                        <dt>Monsters that are weak against {elementDetails.elementName}</dt>
                        <dd>
                            <ul>
                                {
                                    elementDetails.monstersThatAreWeakAgainstThisElement.map((monster) => {
                                        return (
                                            <li key={monster}>
                                                <Link href={'/monsters/' + monster}>{monster}</Link>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </dd>

                        <dt>Monsters that can physically attack with {elementDetails.elementName}</dt>
                        <dd>
                            <ul>
                                {
                                    elementDetails.monstersThatPhysicallyAttackWithThisElement.map((monster) => {
                                        return (
                                            <li key={monster}>
                                                <Link href={'/monsters/' + monster}>{monster}</Link>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </dd>

                        <dt>Monsters that can magically attack with {elementDetails.elementName}</dt>
                        <dd>
                            <ul>
                                {
                                    elementDetails.monstersThatMagicallyAttackWithThisElement.map((monster) => {
                                        return (
                                            <li key={monster}>
                                                <Link href={'/monsters/' + monster}>{monster}</Link>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </dd>
                    </dl>
                </Layout>
            }
        </>
    )
}

export const getStaticPaths: GetStaticPaths<{ name: string }> = async (context) => {
    let results: string[] = [];

    const dataClient = new ExportedMonsterSanctuaryDataClient();
    const elementTypeEnumDetails = await dataClient.enumsClient.getObjectFromFileByFileNameAsync('EElement');

    if (elementTypeEnumDetails?.KeyValueObjects) {
        elementTypeEnumDetails.KeyValueObjects.forEach((keyValueObject) => {
            results.push(keyValueObject.Key);
        })
    }

    return {
        fallback: false,
        paths: results.map((result) => {
            return {
                params: {
                    name: result
                }
            }
        })
    }
}

export const getStaticProps: GetStaticProps<{ elementDetails: ElementDetailsPageProps | null }, { name: string }> = async (context) => {
    var results : ElementDetailsPageProps | null = null;    

    if (context.params) {
        if (context.params.name) {
            const dataClient = new ExportedMonsterSanctuaryDataClient();
            const elementTypeEnumDetails = await dataClient.enumsClient.getObjectFromFileByFileNameAsync('EElement');

            if (elementTypeEnumDetails) {
                if (elementTypeEnumDetails.KeyValueObjects) {
                    const readAllEnumObjectPromises = elementTypeEnumDetails.KeyValueObjects.map(async (keyValueObject) => {
                        if (context.params) {
                            const elementName = keyValueObject.Key;

                            if (elementName === context.params.name) {
                                results = {
                                    elementName: elementName,
                                    monstersThatResistThisElement: [],
                                    monstersThatAreWeakAgainstThisElement: [],
                                    monstersThatPhysicallyAttackWithThisElement: [],
                                    monstersThatMagicallyAttackWithThisElement: [],
                                }

                                const allMonsters = await dataClient.monstersClient.getAllObjectsInDirectoryAsync();
                                allMonsters.forEach((monster) => {
                                    const extendedMonster = new ExtendedMonster(monster);
                                    
                                    if(extendedMonster.canResistElement(keyValueObject.Value)) {
                                        if(results) {
                                            if(!results.monstersThatResistThisElement.includes(monster.Name)) {
                                                results.monstersThatResistThisElement.push(monster.Name);
                                            }
                                        }
                                    }

                                    if(extendedMonster.isWeakAgainstElement(keyValueObject.Value)) {
                                        if(results) {
                                            if(!results.monstersThatAreWeakAgainstThisElement.includes(monster.Name)) {
                                                results.monstersThatAreWeakAgainstThisElement.push(monster.Name);
                                            }
                                        }
                                    }

                                    if(extendedMonster.canPhysicallyAttackWithElement(keyValueObject.Value)) {
                                        if(results) {
                                            if(!results.monstersThatPhysicallyAttackWithThisElement.includes(monster.Name)) {
                                                results.monstersThatPhysicallyAttackWithThisElement.push(monster.Name);
                                            }
                                        }
                                    }

                                    if(extendedMonster.canMagicallyAttackWithElement(keyValueObject.Value)) {
                                        if(results) {
                                            if(!results.monstersThatMagicallyAttackWithThisElement.includes(monster.Name)) {
                                                results.monstersThatMagicallyAttackWithThisElement.push(monster.Name);
                                            }
                                        }
                                    }
                                })

                                if(results) {
                                    results.monstersThatAreWeakAgainstThisElement = results.monstersThatAreWeakAgainstThisElement.sort();
                                    results.monstersThatResistThisElement = results.monstersThatResistThisElement.sort();
                                    results.monstersThatPhysicallyAttackWithThisElement = results.monstersThatPhysicallyAttackWithThisElement.sort();
                                    results.monstersThatMagicallyAttackWithThisElement = results.monstersThatMagicallyAttackWithThisElement.sort();
                                }
                            }
                        }
                    });

                    await Promise.all(readAllEnumObjectPromises);                    
                }
            }
        }
    }

    return {
        props: {
            elementDetails: results
        }
    }

}

export default ElementDetailsPage;