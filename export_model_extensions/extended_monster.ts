import { ExportedMonsterSanctuaryDataTypes } from "@woodman231/exportedmonstersanctuarydatatypes";
import ExtendedSkills from "./extended_skills";

export default class ExtendedMonster {
    originalMonsterDetails: ExportedMonsterSanctuaryDataTypes.Monster;
    extendedSkillsObject: ExtendedSkills;

    /**
     * New extended monster
     * @param monsterDetails - The original monster details
     */
    constructor(monsterDetails: ExportedMonsterSanctuaryDataTypes.Monster) {
        this.originalMonsterDetails = monsterDetails;

        let targetSkills: Array<ExportedMonsterSanctuaryDataTypes.Skill> = [];

        targetSkills.push(monsterDetails.LightShiftPassive);
        targetSkills.push(monsterDetails.DarkShiftPassive);

        monsterDetails.BaseSkills.forEach((skill) => {
            if (skill.IsPassiveElementModifier) {
                targetSkills.push(skill);
            }
        });

        monsterDetails.SkillTrees.forEach((skillTree) => {
            skillTree.Tier1Skills.forEach((skill) => {
                targetSkills.push(skill);
            });

            skillTree.Tier2Skills.forEach((skill) => {
                targetSkills.push(skill);
            });

            skillTree.Tier3Skills.forEach((skill) => {
                targetSkills.push(skill);
            });

            skillTree.Tier4Skills.forEach((skill) => {
                targetSkills.push(skill);
            });

            skillTree.Tier5Skills.forEach((skill) => {
                targetSkills.push(skill);
            });
        });

        monsterDetails.Ultimates.forEach((skill) => {
            targetSkills.push(skill);
        });

        this.extendedSkillsObject = new ExtendedSkills(targetSkills);
    }

    isOfType = (targetMonsterType: ExportedMonsterSanctuaryDataTypes.EMonsterType): boolean => {
        return this.originalMonsterDetails.TypesArray.includes(targetMonsterType);
    }

    canResistElement = (targetElementType: ExportedMonsterSanctuaryDataTypes.EElement): boolean => {
        return this.extendedSkillsObject.getElementalResistances().includes(targetElementType);
    }

    isWeakAgainstElement = (targetElementType: ExportedMonsterSanctuaryDataTypes.EElement): boolean => {
        return this.extendedSkillsObject.getElementalWeaknesses().includes(targetElementType);
    }

    canPhysicallyAttackWithElement = (targetElementType: ExportedMonsterSanctuaryDataTypes.EElement): boolean => {
        return this.extendedSkillsObject.getPhysicalAttackElements().includes(targetElementType);
    }

    canMagicallyAttackWithElement = (targetElment: ExportedMonsterSanctuaryDataTypes.EElement): boolean => {
        return this.extendedSkillsObject.getMagicalAttackElements().includes(targetElment);
    }
}