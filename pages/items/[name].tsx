import ExportedMonsterSanctuaryDataClient from "@woodman231/exportedmonstermanctuarydataclient";
import { ExportedMonsterSanctuaryDataTypes } from "@woodman231/exportedmonstersanctuarydatatypes";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParentPage } from "../../components/layout";
import Layout from "../../components/layout";
import Link from "next/link";
import ExtendedMonster from "../../export_model_extensions/extended_monster";
import ExtendedItem from "../../export_model_extensions/extended_item";

interface ItemDetailsPageProps {
    name: string;
    description: string;
    price: number;
    hatchedMonster?: string;
    catalystDetails?: CatalystDetails[];
    droppedBy?: string[];
    containedIn?: ItemContainer[];
    contains?: ItemContainer[];

    attack?: number;
    magic?: number;
    defense?: number;
    critChance?: number;
    critDamage?: number;
    health?: number;
    mana?: number;
    manaRegeneration?: number;
    damageBonus?: number;
    nonCritDamage?: number;
    healBonus?: number;
    shieldBonus?: number;
    dodgeChance?: number;
    upgradesTo?: ItemUpgradeDetails;
    upgradeMaterialsNeeded?: UpgradeMaterialDetails[];

    relatedBuffs?: string[];
    relatedDebuffs?: string[];
    relatedSpecialBuffs?: string[];
    relatedElements?: string[];
    relatedMonsters?: string[];
    relatedItems?: RelatedItem[];

    relatedPages?: RelatedPageDetails[];
    level?: number;
}

interface ItemUpgradeDetails {
    name: string;
    slugifiedName: string;
}

interface ItemContainer extends ItemUpgradeDetails { }

interface RelatedItem extends ItemUpgradeDetails { }

interface UpgradeMaterialDetails {
    name: string;
    slugifiedName: string;
    quantity: number;
}

interface CatalystDetails {
    baseMonster: string;
    newMonster: string;
}

interface RelatedPageDetails {
    name: string;
    url: string;
}

const ItemDetailsPage: NextPage<{ itemDetails: ItemDetailsPageProps }> = ({ itemDetails }) => {
    const parents: ParentPage[] = [
        {
            pageName: "Items",
            url: "/items"
        }
    ];

    return (
        <>
            <Layout pageName={itemDetails.name} parents={parents}>
                <p>This page lists details for the {itemDetails.name} item in the Monster Sanctuary Video Game.</p>
                <dl>
                    <dt>Name</dt>
                    <dd>{itemDetails.name}</dd>

                    <dt>Description</dt>
                    <dd>{itemDetails.description}</dd>

                    <dt>Price</dt>
                    <dd>{itemDetails.price}</dd>

                    {
                        itemDetails.level &&
                        <>
                            <dt>Level</dt>
                            <dd>{itemDetails.level}</dd>
                        </>
                    }

                    {
                        (itemDetails.attack != null) &&
                        <>
                            <dt>Stat Increases</dt>
                            <dd>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Stat</th>
                                            <th>Increase</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">Attack</th>
                                            <td>{itemDetails.attack}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Magic</th>
                                            <td>{itemDetails.magic}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Defense</th>
                                            <td>{itemDetails.defense}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Crit Chance</th>
                                            <td>{itemDetails.critChance}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Crit Damage</th>
                                            <td>{itemDetails.critDamage}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Health</th>
                                            <td>{itemDetails.health}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Mana</th>
                                            <td>{itemDetails.mana}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Mana Regeneration</th>
                                            <td>{itemDetails.manaRegeneration}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Damage Bonus</th>
                                            <td>{itemDetails.damageBonus}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Non Crit Damage</th>
                                            <td>{itemDetails.nonCritDamage}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Heal Bonus</th>
                                            <td>{itemDetails.healBonus}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Shield Bonus</th>
                                            <td>{itemDetails.shieldBonus}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Dodge Chance</th>
                                            <td>{itemDetails.dodgeChance}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </dd>
                        </>
                    }

                    {
                        itemDetails.hatchedMonster &&
                        <>
                            <dt>Hatched Monster</dt>
                            <dd>
                                <Link href={'/monsters/' + itemDetails.hatchedMonster}>{itemDetails.hatchedMonster}</Link>
                            </dd>
                        </>
                    }

                    {
                        itemDetails.droppedBy &&
                        <>
                            <dt>Dropped By</dt>
                            <dd>
                                <ul>
                                    {
                                        itemDetails.droppedBy.map((monster, index) => {
                                            return (
                                                <li key={index}>
                                                    <Link href={'/monsters/' + monster}>{monster}</Link>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </dd>
                        </>
                    }

                    {
                        itemDetails.containedIn &&
                        <>
                            <dt>Contained In</dt>
                            <dd>
                                <ul>
                                    {
                                        itemDetails.containedIn.map((lootBox, index) => {
                                            return (
                                                <li key={index}>
                                                    <Link href={'/items/' + lootBox.slugifiedName}>{lootBox.name}</Link>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </dd>
                        </>
                    }

                    {
                        itemDetails.contains &&
                        <>
                            <dt>Contains</dt>
                            <dd>
                                <ul>
                                    {
                                        itemDetails.contains.map((containedItem, index) => {
                                            return (
                                                <li key={index}>
                                                    <Link href={'/items/' + containedItem.slugifiedName}>{containedItem.name}</Link>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </dd>
                        </>
                    }

                    {
                        itemDetails.upgradesTo &&
                        <>
                            <dt>Upgrades To</dt>
                            <dd>
                                <Link href={'/items/' + itemDetails.upgradesTo.slugifiedName}>{itemDetails.upgradesTo.name}</Link>
                            </dd>
                            {
                                itemDetails.upgradeMaterialsNeeded &&
                                <>
                                    <dt>Materials Needed to Upgrade</dt>
                                    <dd>
                                        <ul>
                                            {
                                                itemDetails.upgradeMaterialsNeeded.map((upgradeMaterialNeeded, index) => {
                                                    return (
                                                        <li key={index}>
                                                            <Link href={'/items/' + upgradeMaterialNeeded.slugifiedName}>{upgradeMaterialNeeded.name}</Link>{' x ' + upgradeMaterialNeeded.quantity}
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </dd>
                                </>
                            }
                        </>
                    }
                    {
                        itemDetails.relatedBuffs &&
                        <>
                            <dt>Related Buffs</dt>
                            <dd>
                                <ul>
                                    {
                                        itemDetails.relatedBuffs.map((relatedBuff, index) => {
                                            return (
                                                <li key={index}>
                                                    <Link href={'/buffs/' + relatedBuff}>{relatedBuff}</Link>
                                                </li>
                                            )

                                        })
                                    }
                                </ul>
                            </dd>
                        </>
                    }
                    {
                        itemDetails.relatedDebuffs &&
                        <>
                            <dt>Related Debuffs</dt>
                            <dd>
                                <ul>
                                    {
                                        itemDetails.relatedDebuffs.map((relatedDebuff, index) => {
                                            return (
                                                <li key={index}>
                                                    <Link href={'/debuffs/' + relatedDebuff}>{relatedDebuff}</Link>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </dd>
                        </>
                    }
                    {
                        itemDetails.relatedSpecialBuffs &&
                        <>
                            <dt>Related Special Buffs</dt>
                            <dd>
                                <ul>
                                    {
                                        itemDetails.relatedSpecialBuffs.map((relatedSpecialBuff, index) => {
                                            return (
                                                <li key={index}>
                                                    <Link href={'/special_buffs/' + relatedSpecialBuff}>{relatedSpecialBuff}</Link>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </dd>
                        </>
                    }
                    {
                        itemDetails.catalystDetails &&
                        <>
                            <dt>Evolutions</dt>
                            <dd>
                                <ul>
                                    {
                                        itemDetails.catalystDetails.map((catalystDetail, index) => {
                                            return (
                                                <li key={index}>
                                                    <Link href={'/monsters/' + catalystDetail.baseMonster}>{catalystDetail.baseMonster}</Link>{' into '}<Link href={'/monsters/' + catalystDetail.newMonster}>{catalystDetail.newMonster}</Link>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </dd>
                        </>
                    }

                    {
                        itemDetails.relatedMonsters &&
                        <>
                            <dt>Related Monsters</dt>
                            <dd>
                                <ul>
                                    {
                                        itemDetails.relatedMonsters.map((relatedMonster, index) => {
                                            return (
                                                <li key={index}>
                                                    <Link href={'/monsters/' + relatedMonster}>{relatedMonster}</Link>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </dd>
                        </>
                    }

                    {
                        itemDetails.relatedItems &&
                        <>
                            <dt>Related Items</dt>
                            <dd>
                                <ul>
                                    {
                                        itemDetails.relatedItems.map((relatedItem, index) => {
                                            return(
                                                <li key={index}>
                                                    <Link href={'/items/' + relatedItem.slugifiedName}>{relatedItem.name}</Link>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </dd>
                        </>
                    }

                    {
                        itemDetails.relatedPages &&
                        <>
                            <dt>Related Pages</dt>
                            <dd>
                                <ul>
                                    {
                                        itemDetails.relatedPages.map((relatedPage, index) => {
                                            return (
                                                <li key={index}>
                                                    <Link href={relatedPage.url}>{relatedPage.name}</Link>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </dd>
                        </>
                    }
                </dl>
            </Layout>
        </>
    )
}

export const getStaticPaths: GetStaticPaths<{ name: string }> = async () => {

    const dataClient = new ExportedMonsterSanctuaryDataClient();
    const allItemObjects = await dataClient.itemsClient.getAllObjectsInDirectoryAsync();

    return {
        fallback: false,
        paths: allItemObjects.map((itemObject) => {
            const extendedItemObject = new ExtendedItem(itemObject);

            return {
                params: {
                    name: extendedItemObject.slugifiedName
                }
            }
        })
    }
}

export const getStaticProps: GetStaticProps<{ itemDetails: ItemDetailsPageProps }, { name: string }> = async (context) => {

    let results: ItemDetailsPageProps = {
        name: "Not Found",
        description: "The item that you were looking for could not be found.",
        price: 0
    }

    const dataClient = new ExportedMonsterSanctuaryDataClient();
    const allItemObjects = await dataClient.itemsClient.getAllObjectsInDirectoryAsync();

    let rewardBoxLevel1Details: ExportedMonsterSanctuaryDataTypes.Item | null = null;
    let rewardBoxLevel2Details: ExportedMonsterSanctuaryDataTypes.Item | null = null;
    let rewardBoxLevel3Details: ExportedMonsterSanctuaryDataTypes.Item | null = null;
    let rewardBoxLevel4Details: ExportedMonsterSanctuaryDataTypes.Item | null = null;
    let rewardBoxLevel5Details: ExportedMonsterSanctuaryDataTypes.Item | null = null;
    let rewardBoxLevelXDetails: ExportedMonsterSanctuaryDataTypes.Item | null = null;

    let craftBoxDetails: ExportedMonsterSanctuaryDataTypes.Item | null = null;

    let allItemsAsKeyValuePairs: {[key: number]: ExtendedItem} = {};

    // Create a dictionary of all items as key value pairs to be referenced later
    // Grab detals abouut special items that could contain items to relate them back accordingly
    for (let itemObjectIndex = 0; itemObjectIndex < allItemObjects.length; itemObjectIndex++) {
        const itemAsExtendedItem = new ExtendedItem(allItemObjects[itemObjectIndex]);

        allItemsAsKeyValuePairs[itemAsExtendedItem.originalItemDetails.ID] = itemAsExtendedItem;

        switch (allItemObjects[itemObjectIndex].Name) {
            case "Reward Box lvl 1":
                rewardBoxLevel1Details = allItemObjects[itemObjectIndex];
                break;

            case "Reward Box lvl 2":
                rewardBoxLevel2Details = allItemObjects[itemObjectIndex];
                break;

            case "Reward Box lvl 3":
                rewardBoxLevel3Details = allItemObjects[itemObjectIndex];
                break;

            case "Reward Box lvl 4":
                rewardBoxLevel4Details = allItemObjects[itemObjectIndex];
                break;

            case "Reward Box lvl 5":
                rewardBoxLevel5Details = allItemObjects[itemObjectIndex];
                break;

            case "Reward Box X":
                rewardBoxLevelXDetails = allItemObjects[itemObjectIndex];
                break;

            case "Craft Box":
                craftBoxDetails = allItemObjects[itemObjectIndex];
                break;
        }
    }

    let allLootBoxes: ExtendedItem[] = [];

    if (rewardBoxLevel1Details) {
        allLootBoxes.push(new ExtendedItem(rewardBoxLevel1Details));
    }

    if (rewardBoxLevel2Details) {
        allLootBoxes.push(new ExtendedItem(rewardBoxLevel2Details));
    }

    if (rewardBoxLevel3Details) {
        allLootBoxes.push(new ExtendedItem(rewardBoxLevel3Details));
    }

    if (rewardBoxLevel4Details) {
        allLootBoxes.push(new ExtendedItem(rewardBoxLevel4Details));
    }

    if (rewardBoxLevel5Details) {
        allLootBoxes.push(new ExtendedItem(rewardBoxLevel5Details));
    }

    if (rewardBoxLevelXDetails) {
        allLootBoxes.push(new ExtendedItem(rewardBoxLevelXDetails));
    }

    if (craftBoxDetails) {
        allLootBoxes.push(new ExtendedItem(craftBoxDetails));
    }
    
    const allMonsterObjects = await dataClient.monstersClient.getAllObjectsInDirectoryAsync();
    let allMonsterKeyValuePairs: {[key: number]: ExtendedMonster} = {};

    allMonsterObjects.forEach((monster) => {
        const extendedMonsterDetails = new ExtendedMonster(monster);
        allMonsterKeyValuePairs[monster.ID] = extendedMonsterDetails;
    });


    // Relate as much item detail to a monster as possible
    for (let itemObjectIndex = 0; itemObjectIndex < allItemObjects.length; itemObjectIndex++) {
        const extendedItemObject = new ExtendedItem(allItemObjects[itemObjectIndex]);
        if (context.params) {
            if (context.params.name === extendedItemObject.slugifiedName) {
                results.name = extendedItemObject.originalItemDetails.Name;
                results.description = extendedItemObject.originalItemDetails.Description;
                results.price = extendedItemObject.originalItemDetails.Price;
                
                allMonsterObjects.forEach((monster) => {
                    monster.RewardsCommon.forEach((reward) => {
                        if (reward.ID === extendedItemObject.originalItemDetails.ID) {
                            if (results.droppedBy) {
                                results.droppedBy.push(monster.Name);
                            } else {
                                results.droppedBy = [];
                                results.droppedBy.push(monster.Name);
                            }
                        }
                    });

                    monster.RewardsRare.forEach((reward) => {
                        if (reward.ID === extendedItemObject.originalItemDetails.ID) {
                            if (results.droppedBy) {
                                results.droppedBy.push(monster.Name);
                            } else {
                                results.droppedBy = [];
                                results.droppedBy.push(monster.Name);
                            }
                        }
                    });

                    if (extendedItemObject.originalItemDetails.EggProperties) {
                        if (extendedItemObject.originalItemDetails.EggProperties.Monster === monster.ID) {
                            results.hatchedMonster = monster.Name;
                        }
                    }


                    if (extendedItemObject.originalItemDetails.CatalystProperties) {
                        let currentMonsterIsABaseMonster = false;

                        if (extendedItemObject.originalItemDetails.CatalystProperties.BaseMonster === monster.ID) {
                            currentMonsterIsABaseMonster = true;
                        }

                        if (extendedItemObject.originalItemDetails.CatalystProperties.AdditionalBaseMonster) {
                            if (extendedItemObject.originalItemDetails.CatalystProperties.AdditionalBaseMonster.includes(monster.ID)) {
                                currentMonsterIsABaseMonster = true;
                            }
                        }

                        if (currentMonsterIsABaseMonster) {                            
                            const newMonsterDetails = allMonsterKeyValuePairs[extendedItemObject.originalItemDetails.CatalystProperties.EvolveMonster];

                            if (newMonsterDetails) {
                                const newMonsterName = newMonsterDetails.originalMonsterDetails.Name;
                                if (results.catalystDetails) {
                                    results.catalystDetails.push({
                                        baseMonster: monster.Name,
                                        newMonster: newMonsterName
                                    });

                                } else {
                                    results.catalystDetails = [];
                                    results.catalystDetails.push({
                                        baseMonster: monster.Name,
                                        newMonster: newMonsterName
                                    });

                                }
                            }
                        }
                    }
                });                

                allLootBoxes.forEach((lootBox) => {
                    if (lootBox.containsLootByItemObject(extendedItemObject.originalItemDetails)) {
                        if (results.containedIn) {
                            results.containedIn.push({
                                name: lootBox.originalItemDetails.Name,
                                slugifiedName: lootBox.slugifiedName
                            });
                        } else {
                            results.containedIn = [];
                            results.containedIn.push({
                                name: lootBox.originalItemDetails.Name,
                                slugifiedName: lootBox.slugifiedName
                            });
                        }
                    }
                });

                if (extendedItemObject.originalItemDetails.LootBoxProperties) {
                    extendedItemObject.originalItemDetails.LootBoxProperties.Loot.forEach((lootItem) => {                        
                        const lootItemProperties = allItemsAsKeyValuePairs[lootItem];
                        if (lootItemProperties) {
                            if (results.contains) {
                                results.contains.push({
                                    name: lootItemProperties.originalItemDetails.Name,
                                    slugifiedName: lootItemProperties.slugifiedName
                                });
                            } else {
                                results.contains = [];
                                results.contains.push({
                                    name: lootItemProperties.originalItemDetails.Name,
                                    slugifiedName: lootItemProperties.slugifiedName
                                })
                            }
                        }

                    });                    

                    allLootBoxes.forEach((lootBox) => {
                        if(results.relatedItems) {
                            results.relatedItems.push({
                                name: lootBox.originalItemDetails.Name,
                                slugifiedName: lootBox.slugifiedName,
                            });
                        } else {
                            results.relatedItems = [];
                            results.relatedItems.push({
                                name: lootBox.originalItemDetails.Name,
                                slugifiedName: lootBox.slugifiedName,
                            });                            
                        }
                    })
                }

                if (extendedItemObject.originalItemDetails.CraftBoxProperties) {
                    extendedItemObject.originalItemDetails.CraftBoxProperties.Rewards.forEach((craftBoxReward) => {
                        craftBoxReward.CommonRewards.forEach((commonReward) => {
                            const extendedCommonReward = new ExtendedItem(commonReward);
                            if (results.contains) {
                                results.contains.push({
                                    name: commonReward.Name,
                                    slugifiedName: extendedCommonReward.slugifiedName
                                });
                            } else {
                                results.contains = [];
                                results.contains.push({
                                    name: commonReward.Name,
                                    slugifiedName: extendedCommonReward.slugifiedName
                                });
                            }
                        });

                        craftBoxReward.RareRewards.forEach((rareReward) => {
                            const extendedRareReward = new ExtendedItem(rareReward);
                            if (results.contains) {
                                results.contains.push({
                                    name: rareReward.Name,
                                    slugifiedName: extendedRareReward.slugifiedName
                                });
                            } else {
                                results.contains = [];
                                results.contains.push({
                                    name: rareReward.Name,
                                    slugifiedName: extendedRareReward.slugifiedName
                                });
                            }
                        });
                    });
                }

                if(extendedItemObject.originalItemDetails.FoodProperties) {
                    if(extendedItemObject.originalItemDetails.FoodProperties.PrecedingFood) {                        
                        const proceedingFoodDetails = allItemsAsKeyValuePairs[extendedItemObject.originalItemDetails.FoodProperties.PrecedingFood];

                        if(proceedingFoodDetails) {                            
                            if(results.relatedItems) {
                                results.relatedItems.push({
                                    name: proceedingFoodDetails.originalItemDetails.Name,
                                    slugifiedName: proceedingFoodDetails.slugifiedName
                                });
                            } else {
                                results.relatedItems = [];
                                results.relatedItems.push({
                                    name: proceedingFoodDetails.originalItemDetails.Name,
                                    slugifiedName: proceedingFoodDetails.slugifiedName                                
                                });
                            }
                        }                        
                    }

                    if(extendedItemObject.originalItemDetails.FoodProperties.SubsequentFood) {                        
                        const subsequentFoodDetails = allItemsAsKeyValuePairs[extendedItemObject.originalItemDetails.FoodProperties.SubsequentFood];
                        if(subsequentFoodDetails) {
                            if(results.relatedItems) {
                                results.relatedItems.push({
                                    name: subsequentFoodDetails.originalItemDetails.Name,
                                    slugifiedName: subsequentFoodDetails.slugifiedName,
                                });
                            } else {
                                results.relatedItems = [];
                                results.relatedItems.push({
                                    name: subsequentFoodDetails.originalItemDetails.Name,
                                    slugifiedName: subsequentFoodDetails.slugifiedName,
                                });
                            }
                        }
                    }

                    results.level = extendedItemObject.originalItemDetails.FoodProperties.Level;
                }

                if (extendedItemObject.originalItemDetails.EquipmentProperties) {

                    results.attack = extendedItemObject.originalItemDetails.EquipmentProperties.Attack;
                    results.magic = extendedItemObject.originalItemDetails.EquipmentProperties.Magic;
                    results.defense = extendedItemObject.originalItemDetails.EquipmentProperties.Defense;
                    results.critChance = extendedItemObject.originalItemDetails.EquipmentProperties.CritChance;
                    results.critDamage = extendedItemObject.originalItemDetails.EquipmentProperties.CritDamage;
                    results.health = extendedItemObject.originalItemDetails.EquipmentProperties.Health;
                    results.mana = extendedItemObject.originalItemDetails.EquipmentProperties.Mana;
                    results.manaRegeneration = extendedItemObject.originalItemDetails.EquipmentProperties.ManaRegeneration;
                    results.damageBonus = extendedItemObject.originalItemDetails.EquipmentProperties.DamageBonus;
                    results.nonCritDamage = extendedItemObject.originalItemDetails.EquipmentProperties.NonCritDamage;
                    results.healBonus = extendedItemObject.originalItemDetails.EquipmentProperties.HealBonus;
                    results.shieldBonus = extendedItemObject.originalItemDetails.EquipmentProperties.ShieldBonus;
                    results.dodgeChance = extendedItemObject.originalItemDetails.EquipmentProperties.DodgeChance;

                    if (extendedItemObject.originalItemDetails.EquipmentProperties.UpgradesTo) {                        
                        const upgradeItemDetails = allItemsAsKeyValuePairs[extendedItemObject.originalItemDetails.EquipmentProperties.UpgradesTo];
                        if (upgradeItemDetails) {                            
                            results.upgradesTo = {
                                name: upgradeItemDetails.originalItemDetails.Name,
                                slugifiedName: upgradeItemDetails.slugifiedName
                            }
                        }
                    }

                    if (extendedItemObject.originalItemDetails.EquipmentProperties.UpgradeMaterials) {
                        results.upgradeMaterialsNeeded = extendedItemObject.originalItemDetails.EquipmentProperties.UpgradeMaterials.map((upgradeMaterial) => {
                            const extendedUpgradeItemDetails = new ExtendedItem(upgradeMaterial.Item);

                            return {
                                name: upgradeMaterial.Item.Name,
                                slugifiedName: extendedUpgradeItemDetails.slugifiedName,
                                quantity: upgradeMaterial.Quantity,
                            }
                        })
                    }

                    if (extendedItemObject.originalItemDetails.EquipmentProperties.IsInstrument) {
                        if (results.relatedMonsters) {
                            results.relatedMonsters.push('Bard');
                        } else {
                            results.relatedMonsters = [];
                            results.relatedMonsters.push('Bard');
                        }
                    }

                    if (extendedItemObject.originalItemDetails.EquipmentProperties.Type === ExportedMonsterSanctuaryDataTypes.EquipmentType.Ring) {
                        if (results.relatedMonsters) {
                            results.relatedMonsters.push('Mimic');
                        } else {
                            results.relatedMonsters = [];
                            results.relatedMonsters.push('Mimic');
                        }
                    }
                }

                if (extendedItemObject.originalItemDetails.EquipmentBuffStacksProperties) {
                    let relatedBuffNames: string[] = [];

                    const readRelatedBuffFilePromises = extendedItemObject.originalItemDetails.EquipmentBuffStacksProperties.BuffStacks.map(async (buffValue) => {
                        const buffDetails = await dataClient.buffsClient.getObjectByValueAsync(buffValue);
                        if (buffDetails) {
                            relatedBuffNames.push(buffDetails.Name);
                        }
                    });

                    await Promise.all(readRelatedBuffFilePromises);

                    results.relatedBuffs = relatedBuffNames;
                }

                if (extendedItemObject.originalItemDetails.EquipmentChargeProperties) {
                    if (results.relatedSpecialBuffs) {
                        results.relatedSpecialBuffs.push('Charge');
                    } else {
                        results.relatedSpecialBuffs = [];
                        results.relatedSpecialBuffs.push('Charge');
                    }

                    if (extendedItemObject.originalItemDetails.Description.includes('Age')) {
                        if (results.relatedSpecialBuffs) {
                            results.relatedSpecialBuffs.push('Age');
                        } else {
                            results.relatedSpecialBuffs = [];
                            results.relatedSpecialBuffs.push('Age');
                        }
                    }
                }

                if (extendedItemObject.originalItemDetails.EquipmentBloodVesselProperties) {
                    if (results.relatedSpecialBuffs) {
                        results.relatedSpecialBuffs.push('Bleed');
                    } else {
                        results.relatedSpecialBuffs = [];
                        results.relatedSpecialBuffs.push('Bleed');
                    }
                }

                if (extendedItemObject.originalItemDetails.IsEquipmentImproveDebuffs) {
                    if (results.relatedPages) {
                        results.relatedPages.push({ name: "Debuffs", url: "/debuffs" });
                    } else {
                        results.relatedPages = [];
                        results.relatedPages.push({ name: "Debuffs", url: "/debuffs" });
                    }
                }

                break;
            }
        }
    }

    return {
        props: {
            itemDetails: results
        }
    }
}

export default ItemDetailsPage;