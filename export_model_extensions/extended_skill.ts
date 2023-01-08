import { ExportedMonsterSanctuaryDataTypes } from "@woodman231/exportedmonstersanctuarydatatypes";

export class ExtendedSkill {
    readonly exportedSkillDetails: ExportedMonsterSanctuaryDataTypes.Skill

    /**
     * Creates a new ExtendedSkill instance
     * @param skillDetails - The original exported skill
     */
    constructor(skillDetails: ExportedMonsterSanctuaryDataTypes.Skill) {
        this.exportedSkillDetails = skillDetails;
    }

    monsterTypeRestrictions = (): Array<ExportedMonsterSanctuaryDataTypes.EMonsterType> | null => {
        let results: Array<ExportedMonsterSanctuaryDataTypes.EMonsterType> = [];

        if (this.exportedSkillDetails.ActionSpecialBuffProperties) {
            results.push(this.exportedSkillDetails.ActionSpecialBuffProperties.TypeRestriction);
        }

        if (this.exportedSkillDetails.ActionTypeRestrictionProperties) {
            if (this.exportedSkillDetails.ActionTypeRestrictionProperties.Types) {
                this.exportedSkillDetails.ActionTypeRestrictionProperties.Types.forEach((typeRestriction) => {
                    results.push(typeRestriction);
                })
            }
        }

        if (this.exportedSkillDetails.PassiveAntitoxinProperties) {
            results.push(this.exportedSkillDetails.PassiveAntitoxinProperties.TypeRestriction);
        }

        if (this.exportedSkillDetails.PassiveArmorBypassProperties) {
            results.push(this.exportedSkillDetails.PassiveArmorBypassProperties.TypeRestriction);
        }

        if (this.exportedSkillDetails.PassiveBlacksmithingProperties) {
            results.push(this.exportedSkillDetails.PassiveBlacksmithingProperties.TypeRestriction);
        }

        if (this.exportedSkillDetails.PassiveBuffMultiplierProperties) {
            results.push(this.exportedSkillDetails.PassiveBuffMultiplierProperties.TypeRestriction);
        }

        if (this.exportedSkillDetails.PassiveDemonicTheftProperties) {
            results.push(this.exportedSkillDetails.PassiveDemonicTheftProperties.TypeRestriction);
        }

        if (this.exportedSkillDetails.PassiveDodgingProperties) {
            results.push(this.exportedSkillDetails.PassiveDodgingProperties.TypeRestriction);
        }

        if (this.exportedSkillDetails.PassiveHexProperties) {
            results.push(this.exportedSkillDetails.PassiveHexProperties.TypeRestriction1);
            results.push(this.exportedSkillDetails.PassiveHexProperties.TypeRestriction2);
        }

        if (this.exportedSkillDetails.PassiveStartCombatShieldProperties) {
            results.push(this.exportedSkillDetails.PassiveStartCombatShieldProperties.TypeRestriction);
        }

        if (this.exportedSkillDetails.PassivePathToProperties) {
            results.push(this.exportedSkillDetails.PassivePathToProperties.TypeRestriction)
        }

        if (this.exportedSkillDetails.PassiveComboMasterProperties) {
            results.push(this.exportedSkillDetails.PassiveComboMasterProperties.TypeRestriction);
        }

        if (this.exportedSkillDetails.PassiveStartCombatChargesProperties) {
            results.push(this.exportedSkillDetails.PassiveStartCombatChargesProperties.TypeRestriction);
        }

        if (this.exportedSkillDetails.PassiveLordOfTheDeepProperties) {
            results.push(this.exportedSkillDetails.PassiveLordOfTheDeepProperties.TypeRestriction1);
        }

        if (this.exportedSkillDetails.PassivePollutedWaterProperties) {
            results.push(this.exportedSkillDetails.PassivePollutedWaterProperties.TypeRestriction);
        }

        if (this.exportedSkillDetails.PassiveOptimalPerformanceProperties) {
            results.push(this.exportedSkillDetails.PassiveOptimalPerformanceProperties.TypeRestriction);
        }

        if (this.exportedSkillDetails.PassiveTricksterSpiritProperties) {
            results.push(this.exportedSkillDetails.PassiveTricksterSpiritProperties.TypeRestriction);
        }

        if (this.exportedSkillDetails.PassiveSkirmishProperties) {
            results.push(this.exportedSkillDetails.PassiveSkirmishProperties.TypeRestriction);
            results.push(this.exportedSkillDetails.PassiveSkirmishProperties.TypeRestriction2);
        }

        if (this.exportedSkillDetails.PassiveAncientPredationProperties) {
            results.push(this.exportedSkillDetails.PassiveAncientPredationProperties.TypeRestriction);
        }

        if (this.exportedSkillDetails.PassiveGorgeousPlumageProperties) {
            results.push(this.exportedSkillDetails.PassiveGorgeousPlumageProperties.TypeRestriction);
        }

        if (this.exportedSkillDetails.PassiveIntelligentSwarmProperties) {
            results.push(this.exportedSkillDetails.PassiveIntelligentSwarmProperties.TypeRestriction1);
            results.push(this.exportedSkillDetails.PassiveIntelligentSwarmProperties.TypeRestriction2);
        }

        if (this.exportedSkillDetails.PassiveMagicBarrierProperties) {
            results.push(this.exportedSkillDetails.PassiveMagicBarrierProperties.TypeRestriction);
        }

        if (this.exportedSkillDetails.PassiveStampedeProperties) {
            results.push(this.exportedSkillDetails.PassiveStampedeProperties.TypeRestriction);
        }

        if (this.exportedSkillDetails.PassiveScreechProperties) {
            results.push(this.exportedSkillDetails.PassiveScreechProperties.TypeRestriction1);
            results.push(this.exportedSkillDetails.PassiveScreechProperties.TypeRestriction2);
        }

        if (this.exportedSkillDetails.PassiveSlimeSupportProperties) {
            results.push(this.exportedSkillDetails.PassiveSlimeSupportProperties.TypeRestriction);
        }

        if (this.exportedSkillDetails.PassiveAcidSpitProperties) {
            results.push(this.exportedSkillDetails.PassiveAcidSpitProperties.TypeRestriction);
        }

        if (this.exportedSkillDetails.PassiveGoblinScienceProperties) {
            results.push(this.exportedSkillDetails.PassiveGoblinScienceProperties.TypeRestriction);
        }

        if (this.exportedSkillDetails.PassiveBloodMagicProperties) {
            results.push(this.exportedSkillDetails.PassiveBloodMagicProperties.TypeRestriction1);
            results.push(this.exportedSkillDetails.PassiveBloodMagicProperties.TypeRestriction2);
        }

        if (this.exportedSkillDetails.PassiveDragonMasteryProperties) {
            results.push(this.exportedSkillDetails.PassiveDragonMasteryProperties.TypeRestriction);
        }

        if (this.exportedSkillDetails.PassiveDraconicLineageProperties) {
            results.push(this.exportedSkillDetails.PassiveDraconicLineageProperties.TypeRestriction);
        }

        if (this.exportedSkillDetails.PassiveReflectBleedProperties) {
            results.push(this.exportedSkillDetails.PassiveReflectBleedProperties.TypeRestriction);
        }

        if (this.exportedSkillDetails.PassiveSprawlProperties) {
            results.push(this.exportedSkillDetails.PassiveSprawlProperties.TypeRestriction);
        }

        if (this.exportedSkillDetails.PassiveHardShellProperties) {
            results.push(this.exportedSkillDetails.PassiveHardShellProperties.TypeRestriction1);
            results.push(this.exportedSkillDetails.PassiveHardShellProperties.TypeRestriction2);
        }

        if (this.exportedSkillDetails.PassiveKingOfBeastsProperties) {
            results.push(this.exportedSkillDetails.PassiveKingOfBeastsProperties.TypeRestriction);
        }

        if (this.exportedSkillDetails.PassiveSpawnOfChampionsProperties) {
            results.push(this.exportedSkillDetails.PassiveSpawnOfChampionsProperties.TypeRestriction1);
            results.push(this.exportedSkillDetails.PassiveSpawnOfChampionsProperties.TypeRestriction2);
        }

        if (this.exportedSkillDetails.PassiveDragonBloodProperties) {
            results.push(this.exportedSkillDetails.PassiveDragonBloodProperties.MonsterType);
        }

        if (this.exportedSkillDetails.PassiveProtectorProperties) {
            results.push(this.exportedSkillDetails.PassiveProtectorProperties.MonsterType);
            results.push(this.exportedSkillDetails.PassiveProtectorProperties.MonsterType2);
        }

        if (this.exportedSkillDetails.PassiveEmpowerProperties) {
            results.push(this.exportedSkillDetails.PassiveEmpowerProperties.MonsterType);
        }

        if (this.exportedSkillDetails.PassiveAuraIncreaseStatsProperties) {
            results.push(this.exportedSkillDetails.PassiveAuraIncreaseStatsProperties.MonsterType);
        }

        if (this.exportedSkillDetails.PassiveSupplyProperties) {
            results.push(this.exportedSkillDetails.PassiveSupplyProperties.MonsterType);
            results.push(this.exportedSkillDetails.PassiveSupplyProperties.MonsterType2);
        }

        if (results.length > 0) {
            return results;
        }

        return null;
    }

    isRestrictedToType = (targetMonsterType: ExportedMonsterSanctuaryDataTypes.EMonsterType): boolean => {
        const monsterTypeRestrictions = this.monsterTypeRestrictions();

        if (monsterTypeRestrictions) {
            return monsterTypeRestrictions.includes(targetMonsterType);
        }

        return false;
    }

    hasOverlayBuff = (targetBuff: ExportedMonsterSanctuaryDataTypes.BuffType): boolean => {
        if (this.exportedSkillDetails.PassiveSkillProperties) {
            if (this.exportedSkillDetails.PassiveSkillProperties.OverlayBuffs) {
                return this.exportedSkillDetails.PassiveSkillProperties.OverlayBuffs.includes(targetBuff);
            }
        }

        if (this.exportedSkillDetails.ActionBuffProperties) {
            if (this.exportedSkillDetails.ActionBuffProperties.Buffs) {
                return this.exportedSkillDetails.ActionBuffProperties.Buffs.includes(targetBuff);
            }
        }

        if (this.exportedSkillDetails.PassiveExtraBuffProperties) {
            if (this.exportedSkillDetails.PassiveExtraBuffProperties.Buff) {
                return (this.exportedSkillDetails.PassiveExtraBuffProperties.Buff == targetBuff)
            }
        }

        if (this.exportedSkillDetails.PassiveIncreaseBuffStacksProperties) {
            if (this.exportedSkillDetails.PassiveIncreaseBuffStacksProperties.DuoBuff) {
                return ((this.exportedSkillDetails.PassiveIncreaseBuffStacksProperties.Buff === targetBuff) || (this.exportedSkillDetails.PassiveIncreaseBuffStacksProperties.Buff2 === targetBuff))
            } else {
                return this.exportedSkillDetails.PassiveIncreaseBuffStacksProperties.Buff === targetBuff;
            }
        }

        if (this.exportedSkillDetails.PassiveBarricadeProperties) {
            if (this.exportedSkillDetails.PassiveBarricadeProperties.Buff) {
                return this.exportedSkillDetails.PassiveBarricadeProperties.Buff === targetBuff;
            }
        }

        if (this.exportedSkillDetails.PassiveExploitProperties) {
            if (this.exportedSkillDetails.PassiveExploitProperties.Buff) {
                return this.exportedSkillDetails.PassiveExploitProperties.Buff == targetBuff;
            }
        }

        if (this.exportedSkillDetails.PassiveForcefulBuffProperties) {
            if (this.exportedSkillDetails.PassiveForcefulBuffProperties.Buff) {
                return this.exportedSkillDetails.PassiveForcefulBuffProperties.Buff === targetBuff;
            }
        }

        if (this.exportedSkillDetails.PassiveGainBuffProperties) {
            if (this.exportedSkillDetails.PassiveGainBuffProperties.Buff) {
                return this.exportedSkillDetails.PassiveGainBuffProperties.Buff === targetBuff;
            }
        }

        return false;
    }

    hasOverlayDebuff = (targetDebuff: ExportedMonsterSanctuaryDataTypes.DebuffType): boolean => {
        if (this.exportedSkillDetails.PassiveSkillProperties) {
            if (this.exportedSkillDetails.PassiveSkillProperties.OverlayDebuffs) {
                return this.exportedSkillDetails.PassiveSkillProperties.OverlayDebuffs.includes(targetDebuff)
            }
        }

        if (this.exportedSkillDetails.PassiveDebuffChanceProperties) {
            if (this.exportedSkillDetails.PassiveDebuffChanceProperties.Debuff) {
                return this.exportedSkillDetails.PassiveDebuffChanceProperties.Debuff === targetDebuff;
            }
        }

        if (this.exportedSkillDetails.PassiveIncreaseDebuffStacksProperties) {
            if (this.exportedSkillDetails.PassiveIncreaseDebuffStacksProperties.Debuff) {
                return this.exportedSkillDetails.PassiveIncreaseDebuffStacksProperties.Debuff === targetDebuff;
            }
        }

        if (this.exportedSkillDetails.PassiveDebuffOnCritProperties) {
            if (this.exportedSkillDetails.PassiveDebuffOnCritProperties.Debuff) {
                return this.exportedSkillDetails.PassiveDebuffOnCritProperties.Debuff === targetDebuff;
            }
        }

        if (this.exportedSkillDetails.PassiveDamageOnDebuffProperties) {
            if (this.exportedSkillDetails.PassiveDamageOnDebuffProperties.requiresOtherDebuff) {
                return (this.exportedSkillDetails.PassiveDamageOnDebuffProperties.Debuff === targetDebuff || this.exportedSkillDetails.PassiveDamageOnDebuffProperties.SecondDebuff === targetDebuff);
            }
            else {
                return this.exportedSkillDetails.PassiveDamageOnDebuffProperties.Debuff === targetDebuff;
            }
        }

        if (this.exportedSkillDetails.ActionDebuffOnHitProperties) {
            if (this.exportedSkillDetails.ActionDebuffOnHitProperties.dualDebuff) {
                return (this.exportedSkillDetails.ActionDebuffOnHitProperties.Debuff === targetDebuff || this.exportedSkillDetails.ActionDebuffOnHitProperties.Debuff2 === targetDebuff)
            } else {
                return this.exportedSkillDetails.ActionDebuffOnHitProperties.Debuff == targetDebuff;
            }
        }

        if (this.exportedSkillDetails.PassiveStartCombatDebuffProperties) {
            if (this.exportedSkillDetails.PassiveStartCombatDebuffProperties.Debuff) {
                return this.exportedSkillDetails.PassiveStartCombatDebuffProperties.Debuff === targetDebuff;
            }
        }

        if (this.exportedSkillDetails.PassiveSpreadDebuffProperties) {
            if (this.exportedSkillDetails.PassiveSpreadDebuffProperties.Debuff) {
                return this.exportedSkillDetails.PassiveSpreadDebuffProperties.Debuff === targetDebuff;
            }
        }

        if (this.exportedSkillDetails.PassiveIncreaseDebuffStacksProperties) {
            if (this.exportedSkillDetails.PassiveIncreaseDebuffStacksProperties.Debuff) {
                return this.exportedSkillDetails.PassiveIncreaseDebuffStacksProperties.Debuff === targetDebuff;
            }
        }

        if (this.exportedSkillDetails.PassiveSteampunkProperties) {
            if (this.exportedSkillDetails.PassiveSteampunkProperties.Debuff) {
                return this.exportedSkillDetails.PassiveSteampunkProperties.Debuff === targetDebuff;
            }
        }

        if (this.exportedSkillDetails.PassiveToxicSupportProperties) {
            if (this.exportedSkillDetails.PassiveToxicSupportProperties.Debuff) {
                return this.exportedSkillDetails.PassiveToxicSupportProperties.Debuff === targetDebuff;
            }
        }

        if (this.exportedSkillDetails.PassiveSevereHitProperties) {
            if (this.exportedSkillDetails.PassiveSevereHitProperties.Debuff) {
                return this.exportedSkillDetails.PassiveSevereHitProperties.Debuff === targetDebuff;
            }
        }

        if (this.exportedSkillDetails.PassiveDebuffOnGettingHitProperties) {
            if (this.exportedSkillDetails.PassiveDebuffOnGettingHitProperties.Debuff) {
                return this.exportedSkillDetails.PassiveDebuffOnGettingHitProperties.Debuff === targetDebuff;
            }
        }

        return false;
    }

    hasOverlaySpecialBuff = (targetSpecialBuff: ExportedMonsterSanctuaryDataTypes.ESpecialBuff): boolean => {
        if (this.exportedSkillDetails.PassiveSkillProperties) {
            if (this.exportedSkillDetails.PassiveSkillProperties.OverlaySpecialBuff) {
                return (this.exportedSkillDetails.PassiveSkillProperties.OverlaySpecialBuff.BuffType === targetSpecialBuff)
            }
        }

        if (this.exportedSkillDetails.ActionSpecialBuffProperties) {
            if (this.exportedSkillDetails.ActionSpecialBuffProperties.DoubleBuff) {
                return ((this.exportedSkillDetails.ActionSpecialBuffProperties.Buff === targetSpecialBuff) || (this.exportedSkillDetails.ActionSpecialBuffProperties.Buff2 === targetSpecialBuff))
            } else {
                return this.exportedSkillDetails.ActionSpecialBuffProperties.Buff === targetSpecialBuff
            }
        }

        if (this.exportedSkillDetails.PassiveSpecialBuffChanceProperties) {
            if (this.exportedSkillDetails.PassiveSpecialBuffChanceProperties.Buff) {
                return this.exportedSkillDetails.PassiveSpecialBuffChanceProperties.Buff == targetSpecialBuff;
            }
        }

        if (this.exportedSkillDetails.PassiveSpecialBuffOnGettingHitProperties) {
            if (this.exportedSkillDetails.PassiveSpecialBuffOnGettingHitProperties.Buff) {
                return this.exportedSkillDetails.PassiveSpecialBuffOnGettingHitProperties.Buff === targetSpecialBuff;
            }
        }

        if (this.exportedSkillDetails.PassiveSpecialBuffDamageModifierProperties) {
            if (this.exportedSkillDetails.PassiveSpecialBuffDamageModifierProperties.Buff) {
                return this.exportedSkillDetails.PassiveSpecialBuffDamageModifierProperties.Buff == targetSpecialBuff;
            }
        }

        return false;
    }
}