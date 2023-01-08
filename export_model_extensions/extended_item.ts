import { ExportedMonsterSanctuaryDataTypes } from "@woodman231/exportedmonstersanctuarydatatypes";
import slugify from "slugify";

export default class ExtendedItem {
    readonly originalItemDetails : ExportedMonsterSanctuaryDataTypes.Item
    /**
     * Creates a new instance of extended item
     * @param itemDetails - The original item details
     */
    constructor(itemDetails: ExportedMonsterSanctuaryDataTypes.Item) {
        this.originalItemDetails = itemDetails;
    }

    get slugifiedName(): string {
        if(this.originalItemDetails.Name === "??? Egg") {
            return slugify('Unknown Egg');
        }

        return slugify(this.originalItemDetails.Name);
    }

    containsLootByItemID = (id: number): boolean => {
        let results = false;
        
        if(this.originalItemDetails.LootBoxProperties) {
            if(this.originalItemDetails.LootBoxProperties.Loot.includes(id)) {
                results = true;
            }
        }
    
        if(this.originalItemDetails.CraftBoxProperties) {
            this.originalItemDetails.CraftBoxProperties.Rewards.forEach((reward) => {
                reward.CommonRewards.forEach((commonReward) => {
                    if(commonReward.ID === id) {
                        results = true;
                    }
                });
    
                reward.RareRewards.forEach((rareReward) => {
                    if(rareReward.ID === id) {
                        results = true;
                    }
                });            
            });
        }

        return results;
    }

    containsLootByItemObject = (referenceable: {ID: number}): boolean => {
        return this.containsLootByItemID(referenceable.ID);
    }

}