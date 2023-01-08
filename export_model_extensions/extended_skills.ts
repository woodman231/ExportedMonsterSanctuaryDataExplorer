import { ExportedMonsterSanctuaryDataTypes } from "@woodman231/exportedmonstersanctuarydatatypes";
import { ExtendedSkill } from "./extended_skill";

export default class ExtendedSkills {
    extendedSkillsList: Array<ExtendedSkill>;

    /**
     * Creates a new list of extended skills
     * @param skills - The original list of skills
     */
    constructor(skills: Array<ExportedMonsterSanctuaryDataTypes.Skill>) {
        this.extendedSkillsList = skills.map((skill) => {
            return new ExtendedSkill(skill);
        });
    }

    getElementalResistances = (): Array<ExportedMonsterSanctuaryDataTypes.EElement> => {
        let results: Array<ExportedMonsterSanctuaryDataTypes.EElement> = [];

        this.extendedSkillsList.forEach((skill) => {
            if (skill.exportedSkillDetails.PassiveElementModifierProperties) {
                if (skill.exportedSkillDetails.PassiveElementModifierProperties.Modifier < 0) {
                    if (!results.includes(skill.exportedSkillDetails.PassiveElementModifierProperties.Element)) {
                        results.push(skill.exportedSkillDetails.PassiveElementModifierProperties.Element);
                    }
                }
            }
        })

        return results;
    }

    getElementalWeaknesses = (): Array<ExportedMonsterSanctuaryDataTypes.EElement> => {
        let results: Array<ExportedMonsterSanctuaryDataTypes.EElement> = [];

        this.extendedSkillsList.forEach((skill) => {
            if (skill.exportedSkillDetails.PassiveElementModifierProperties) {
                if (skill.exportedSkillDetails.PassiveElementModifierProperties.Modifier > 0) {
                    if (!results.includes(skill.exportedSkillDetails.PassiveElementModifierProperties.Element)) {
                        results.push(skill.exportedSkillDetails.PassiveElementModifierProperties.Element);
                    }
                }
            }
        })

        return results;
    }

    getPhysicalAttackElements = (): Array<ExportedMonsterSanctuaryDataTypes.EElement> => {
        let results: Array<ExportedMonsterSanctuaryDataTypes.EElement> = [];

        this.extendedSkillsList.forEach((skill) => {
            if (skill.exportedSkillDetails.ActionDamageProperties) {
                if (skill.exportedSkillDetails.ActionDamageProperties.Type == ExportedMonsterSanctuaryDataTypes.EDamageType.Physical) {
                    if (!results.includes(skill.exportedSkillDetails.ActionDamageProperties.Element)) {
                        results.push(skill.exportedSkillDetails.ActionDamageProperties.Element);
                    }
                }
            }
        })

        return results;
    }

    getMagicalAttackElements = (): Array<ExportedMonsterSanctuaryDataTypes.EElement> => {
        let results: Array<ExportedMonsterSanctuaryDataTypes.EElement> = [];

        this.extendedSkillsList.forEach((skill) => {
            if (skill.exportedSkillDetails.ActionDamageProperties) {
                if (skill.exportedSkillDetails.ActionDamageProperties.Type == ExportedMonsterSanctuaryDataTypes.EDamageType.Magical) {
                    if (!results.includes(skill.exportedSkillDetails.ActionDamageProperties.Element)) {
                        results.push(skill.exportedSkillDetails.ActionDamageProperties.Element);
                    }
                }
            }
        })

        return results;
    }
}