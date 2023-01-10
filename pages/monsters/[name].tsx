import ExportedMonsterSanctuaryDataClient from "@woodman231/exportedmonstermanctuarydataclient";
import { ExportedMonsterSanctuaryDataTypes } from "@woodman231/exportedmonstersanctuarydatatypes";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParentPage } from "../../components/layout";
import Layout from "../../components/layout";
import Link from "next/link";
import ExtendedMonster from "../../export_model_extensions/extended_monster";
import ExtendedItem from "../../export_model_extensions/extended_item";
import { WithContext, WebPage, Person, VideoGame } from "schema-dts"
import { ExportedMonsterSanctuaryDataExplorerWebsite } from '../../json-ld_objects/exportedmonstersanctuarydataexplorer_website'
import { ExportedMonsterSanctuaryDataExplorerContributors } from "../../json-ld_objects/exportedmonstersanctuarydataexplorer_contributors_org";
import { MonsterSanctuaryVideoGame } from "../../json-ld_objects/monster_sanctuary_video_game";
import { websiteURL } from '../../constants'

interface MonsterDetailsPageProps {
    monsterName: string;
    types: string[];
    exploreAbilityName: string;
    exploreAbilityDescription: string;
    evolvesTo?: EvolutionTo;
    evolvesFrom?: EvolutionFrom[];
    elementalResistances: string[];
    elementalWeaknesses: string[];
    physicalDamageElements: string[];
    magicalDamageElements: string[];
    lightShiftAbilityName: string;
    lightShiftAbilityDescription: string;
    darkShiftAbilityName: string;
    darkShiftAbilityDescription: string;
    skills: SkillDescriptionQuantity[];
    drops: DropNameAndDescription[];
    appearances: string[];
}

interface SkillDescriptionQuantity {
    name: string;
    description: string;
    quantity: number;
}

interface DropNameAndDescription {
    name: string;
    slugifiedName: string;
    description: string;
}

interface EvolutionFrom {
    monster: string;
    evolvesWith: EvolutionItem;
}

interface EvolutionTo {
    monster: string;
    evolvesWith: EvolutionItem;
}

interface EvolutionItem {
    itemName: string;
    slugifiedName: string;
}

const MonsterDetailsPage: NextPage<{ monsterDetails: MonsterDetailsPageProps | null }> = ({ monsterDetails }) => {
    const parents: ParentPage[] = [
        {
            pageName: "Monsters",
            url: "/monsters"
        }
    ];

    let webPageJSONLD: WithContext<WebPage> | null = null;

    if (monsterDetails) {

        const monsterCharacter: Person = {
            "@type": "Person",
            "name": monsterDetails.monsterName,
            "description": monsterDetails.types.join(' '),
            "url": websiteURL + '/monsters/' + monsterDetails.monsterName,
        }

        const monsterSanctuaryVideoGameWithMonsterCharacter: VideoGame = {
            ...MonsterSanctuaryVideoGame,
            "character": monsterCharacter
        }

        webPageJSONLD = {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "author": ExportedMonsterSanctuaryDataExplorerContributors,
            "name": monsterDetails.monsterName,
            "description": `This page lists details for the Monster Sanctuary monster: ${monsterDetails.monsterName}`,
            "url": websiteURL + '/monsters/' + monsterDetails.monsterName,
            "about": monsterSanctuaryVideoGameWithMonsterCharacter,
            "isPartOf": ExportedMonsterSanctuaryDataExplorerWebsite
        }
    }

    return (
        monsterDetails && webPageJSONLD &&
        <Layout pageName={monsterDetails.monsterName} parents={parents} jsonldObject={webPageJSONLD}>
            <p>This page lists details for the Monster Sanctuary monster: {monsterDetails.monsterName}</p>
            <dl>
                <dt>Name</dt>
                <dd>{monsterDetails.monsterName}</dd>

                <dt>Types</dt>
                <dd>
                    <ul>
                        {
                            monsterDetails.types.map((type, index) => {
                                return (
                                    <li key={index}>
                                        <Link href={'/monster_types/' + type}>{type}</Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </dd>

                <dt>Explore Ability</dt>
                <dd>
                    <Link href={'/explore_abilities/' + monsterDetails.exploreAbilityName}>{monsterDetails.exploreAbilityName}</Link>{' '}{monsterDetails.exploreAbilityDescription}
                </dd>

                <dt>Elemental Resistances</dt>
                <dd>
                    <ul>
                        {
                            monsterDetails.elementalResistances.map((element, index) => {
                                return (
                                    <li key={index}>
                                        <Link href={'/elements/' + element}>{element}</Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </dd>

                <dt>Elemental Weaknesses</dt>
                <dd>
                    <ul>
                        {
                            monsterDetails.elementalWeaknesses.map((element, index) => {
                                return (
                                    <li key={index}>
                                        <Link href={'/elements/' + element}>{element}</Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </dd>

                <dt>Physical Damage Elements</dt>
                <dd>
                    <ul>
                        {
                            monsterDetails.physicalDamageElements.map((element, index) => {
                                return (
                                    <li key={index}>
                                        <Link href={'/elements/' + element}>{element}</Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </dd>

                <dt>Magical Damage Elements</dt>
                <dd>
                    <ul>
                        {
                            monsterDetails.magicalDamageElements.map((element, index) => {
                                return (
                                    <li key={index}>
                                        <Link href={'/elements/' + element}>{element}</Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </dd>

                {
                    monsterDetails.evolvesTo &&
                    <>
                        <dt>Evolves To</dt>
                        <dd>
                            <Link href={'/monsters/' + monsterDetails.evolvesTo.monster}>{monsterDetails.evolvesTo.monster}</Link>{' with '}<Link href={'/items/' + monsterDetails.evolvesTo.evolvesWith.slugifiedName}>{monsterDetails.evolvesTo.evolvesWith.itemName}</Link>
                        </dd>
                    </>
                }

                {
                    monsterDetails.evolvesFrom &&
                    <>
                        <dt>Evolves From</dt>
                        <dd>
                            <ul>
                                {
                                    monsterDetails.evolvesFrom.map((evolution, index) => {
                                        return (
                                            <li key={index}>
                                                <Link href={'/monsters/' + evolution.monster}>{evolution.monster}</Link>{' with '}<Link href={'/items/' + evolution.evolvesWith.slugifiedName}>{evolution.evolvesWith.itemName}</Link>
                                            </li>
                                        )
                                    })
                                }
                            </ul>

                        </dd>
                    </>
                }

                <dt>Light Shift Ability</dt>
                <dd><Link href={'/skills/' + monsterDetails.lightShiftAbilityName}>{monsterDetails.lightShiftAbilityName}</Link>{' - '}{monsterDetails.lightShiftAbilityDescription}</dd>

                <dt>Dark Shift Ability</dt>
                <dd><Link href={'/skills/' + monsterDetails.darkShiftAbilityName}>{monsterDetails.darkShiftAbilityName}</Link>{' - '}{monsterDetails.darkShiftAbilityDescription}</dd>

                <dt>Skills and Quantities</dt>
                <dd>
                    <ul>
                        {
                            monsterDetails.skills.map((skillAndQuantityDetails, index) => {
                                return (
                                    <li key={index}><Link href={'/skills/' + skillAndQuantityDetails.name}>{skillAndQuantityDetails.name}</Link> - {skillAndQuantityDetails.description} x {skillAndQuantityDetails.quantity}</li>
                                )
                            })
                        }
                    </ul>

                </dd>

                <dt>Drops</dt>
                <dd>
                    <ul>
                        {
                            monsterDetails.drops.map((drop, index) => {
                                return (
                                    <li key={index}>
                                        <Link href={'/items/' + drop.slugifiedName}>{drop.name}</Link> - {drop.description}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </dd>

                <dt>Appearances</dt>
                <dd>
                    <ul>
                        {
                            monsterDetails.appearances.map((appearance, index) => {
                                return (
                                    <li key={index}>
                                        {appearance}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </dd>

            </dl>
        </Layout>
    )
}

export const getStaticPaths: GetStaticPaths<{ name: string }> = async (context) => {
    const dataClient = new ExportedMonsterSanctuaryDataClient();
    const fileNames = await dataClient.monstersClient.getAllFileNamesAsync();

    return {
        fallback: false,
        paths: fileNames.map((fileName) => {
            return {
                params: {
                    name: fileName
                }
            }
        })
    }
}

export const getStaticProps: GetStaticProps<{ monsterDetails: MonsterDetailsPageProps | null }, { name: string }> = async (context) => {
    let results: MonsterDetailsPageProps | null = null;

    const dataClient = new ExportedMonsterSanctuaryDataClient();

    if (context.params) {
        const elementEnumDetails = await dataClient.enumsClient.getObjectFromFileByFileNameAsync('EElement');

        let allCatalystItems: ExportedMonsterSanctuaryDataTypes.Item[] = [];

        const allItems = await dataClient.itemsClient.getAllObjectsInDirectoryAsync();
        allItems.forEach((item) => {
            if (item.IsCatalyst) {
                allCatalystItems.push(item);
            }
        });

        let allMonstersAsKeyValuePairs: { [key: number]: ExtendedMonster } = {};

        const allMonsters = await dataClient.monstersClient.getAllObjectsInDirectoryAsync();

        allMonsters.forEach((monster) => {
            allMonstersAsKeyValuePairs[monster.ID] = new ExtendedMonster(monster);
        });

        const monsterDetails = await dataClient.monstersClient.getObjectFromFileByFileNameAsync(context.params.name);
        if (monsterDetails) {
            const extendedMonsterDetails = new ExtendedMonster(monsterDetails);

            results = {} as MonsterDetailsPageProps;
            results.monsterName = monsterDetails.Name;
            results.types = monsterDetails.TypesName.split(' ');
            results.exploreAbilityName = monsterDetails.ExploreAbilityName;
            results.exploreAbilityDescription = monsterDetails.ExploreAbilityDescription;

            let elementalResistances: string[] = [];
            let elementalWeaknesses: string[] = [];

            monsterDetails.BaseSkills.forEach((baseSkill) => {
                if (baseSkill.PassiveElementModifierProperties) {
                    let elementName = '';

                    if (elementEnumDetails) {
                        if (elementEnumDetails.InvertedKeyValues) {
                            elementName = elementEnumDetails.InvertedKeyValues[baseSkill.PassiveElementModifierProperties.Element];
                        }
                    }

                    if (baseSkill.PassiveElementModifierProperties.Modifier < 0) {
                        if (!elementalResistances.includes(elementName)) {
                            elementalResistances.push(elementName);
                        }
                    }

                    if (baseSkill.PassiveElementModifierProperties.Modifier > 0) {
                        if (!elementalWeaknesses.includes(elementName)) {
                            elementalWeaknesses.push(elementName);
                        }
                    }
                }
            });

            elementalResistances = elementalResistances.sort();
            elementalWeaknesses = elementalWeaknesses.sort();

            results.elementalResistances = elementalResistances;
            results.elementalWeaknesses = elementalWeaknesses;

            let physicalDamageElements: string[] = [];
            let magicalDamageElements: string[] = [];

            extendedMonsterDetails.extendedSkillsObject.extendedSkillsList.forEach((skill) => {
                if (skill.exportedSkillDetails.ActionDamageProperties) {
                    let elementName = "";

                    if (elementEnumDetails) {
                        if (elementEnumDetails.InvertedKeyValues) {
                            elementName = elementEnumDetails.InvertedKeyValues[skill.exportedSkillDetails.ActionDamageProperties.Element];
                        }
                    }

                    if (skill.exportedSkillDetails.ActionDamageProperties.Type === ExportedMonsterSanctuaryDataTypes.EDamageType.Physical) {
                        if (!physicalDamageElements.includes(elementName)) {
                            physicalDamageElements.push(elementName);
                        }
                    }

                    if (skill.exportedSkillDetails.ActionDamageProperties.Type === ExportedMonsterSanctuaryDataTypes.EDamageType.Magical) {
                        if (!magicalDamageElements.includes(elementName)) {
                            magicalDamageElements.push(elementName);
                        }
                    }
                }
            });

            physicalDamageElements = physicalDamageElements.sort();
            magicalDamageElements = magicalDamageElements.sort();

            results.physicalDamageElements = physicalDamageElements;
            results.magicalDamageElements = magicalDamageElements;

            results.lightShiftAbilityName = monsterDetails.LightShiftPassive.Name;
            results.lightShiftAbilityDescription = monsterDetails.LightShiftPassive.Description;
            results.darkShiftAbilityName = monsterDetails.DarkShiftPassive.Name;
            results.darkShiftAbilityDescription = monsterDetails.DarkShiftPassive.Description

            allCatalystItems.forEach((catalystItem) => {
                if (catalystItem.CatalystProperties) {
                    const extendedCatalystItemDetails = new ExtendedItem(catalystItem);

                    let monsterIsBaseMonster = false;
                    let monsterIsEvolvedMonster = false;
                    let baseMonsterIDs: number[] = [];

                    if (catalystItem.CatalystProperties.BaseMonster === monsterDetails.ID) {
                        monsterIsBaseMonster = true;
                    }

                    if (catalystItem.CatalystProperties.AdditionalBaseMonster) {
                        if (catalystItem.CatalystProperties.AdditionalBaseMonster.includes(monsterDetails.ID)) {
                            monsterIsBaseMonster = true;
                        }
                    }

                    if (catalystItem.CatalystProperties.EvolveMonster == monsterDetails.ID) {
                        monsterIsEvolvedMonster = true;
                        baseMonsterIDs.push(catalystItem.CatalystProperties.BaseMonster);

                        if (catalystItem.CatalystProperties.AdditionalBaseMonster) {
                            catalystItem.CatalystProperties.AdditionalBaseMonster.forEach((baseMonster) => {
                                baseMonsterIDs.push(baseMonster);
                            })
                        }
                    }

                    if (monsterIsBaseMonster) {
                        const evolvedMonsterDetails = allMonstersAsKeyValuePairs[catalystItem.CatalystProperties.EvolveMonster];
                        if (evolvedMonsterDetails) {
                            if (results) {
                                results.evolvesTo = {
                                    monster: evolvedMonsterDetails.originalMonsterDetails.Name,
                                    evolvesWith: {
                                        itemName: catalystItem.Name,
                                        slugifiedName: extendedCatalystItemDetails.slugifiedName,
                                    }
                                }
                            }
                        }
                    }

                    if (monsterIsEvolvedMonster) {
                        baseMonsterIDs.forEach((baseMonsterID) => {
                            const baseMonsterDetails = allMonstersAsKeyValuePairs[baseMonsterID];
                            if (baseMonsterDetails) {
                                if (results) {
                                    if (results.evolvesFrom) {
                                        results.evolvesFrom.push({
                                            monster: baseMonsterDetails.originalMonsterDetails.Name,
                                            evolvesWith: {
                                                itemName: catalystItem.Name,
                                                slugifiedName: extendedCatalystItemDetails.slugifiedName
                                            }
                                        })
                                    } else {
                                        results.evolvesFrom = [];
                                        results.evolvesFrom.push({
                                            monster: baseMonsterDetails.originalMonsterDetails.Name,
                                            evolvesWith: {
                                                itemName: catalystItem.Name,
                                                slugifiedName: extendedCatalystItemDetails.slugifiedName
                                            }
                                        })
                                    }
                                }
                            }
                        });
                    }
                }

            });

            let skills: SkillDescriptionQuantity[] = [];

            extendedMonsterDetails.extendedSkillsObject.extendedSkillsList.forEach((skill) => {
                const skillName = skill.exportedSkillDetails.Name;
                const skilLDescription = skill.exportedSkillDetails.Description;

                const currentSkillsLength = skills.length;
                let indexOfCurrentSkill = -1;

                for (let i = 0; i < currentSkillsLength; i++) {
                    if (skills[i].name === skillName) {
                        indexOfCurrentSkill = i;
                        break;
                    }
                }

                if (indexOfCurrentSkill === -1) {
                    skills.push({
                        name: skillName,
                        description: skilLDescription,
                        quantity: 0,
                    })

                    indexOfCurrentSkill = currentSkillsLength;
                }

                skills[indexOfCurrentSkill].quantity = skills[indexOfCurrentSkill].quantity + 1;

            });

            skills = skills.sort((a, b): number => {
                const aSkillName = a.name.toLowerCase();
                const bSkillName = b.name.toLowerCase();

                if (aSkillName < bSkillName) {
                    return -1;
                }

                if (aSkillName > bSkillName) {
                    return 1;
                }

                return 0;
            })

            results.skills = skills;

            let drops: DropNameAndDescription[] = [];

            monsterDetails.RewardsCommon.forEach((reward) => {
                const extendedReward = new ExtendedItem(reward);

                drops.push({
                    name: reward.Name,
                    slugifiedName: extendedReward.slugifiedName,
                    description: reward.Description
                })
            });

            monsterDetails.RewardsRare.forEach((reward) => {
                const extendedReward = new ExtendedItem(reward);

                drops.push({
                    name: reward.Name,
                    slugifiedName: extendedReward.slugifiedName,
                    description: reward.Description
                });
            })

            drops = drops.sort((a, b): number => {
                const aName = a.name.toLowerCase();
                const bName = b.name.toLowerCase();

                if (aName < bName) {
                    return -1;
                }

                if (aName > bName) {
                    return 1;
                }

                return 0;
            });

            results.drops = drops;

            let appearances: string[] = [];

            monsterDetails.Appearances.forEach((appearance) => {
                const combinedName = `${appearance.MapAreaName} - ${appearance.SceneName}`;

                if (!appearances.includes(combinedName)) {
                    appearances.push(combinedName);
                }
            });

            appearances = appearances.sort();

            results.appearances = appearances;

        }
    }

    return {
        props: {
            monsterDetails: results,
        }
    }
}

export default MonsterDetailsPage;