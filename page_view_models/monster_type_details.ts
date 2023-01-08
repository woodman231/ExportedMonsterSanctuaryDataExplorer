import { SkillDetailsWithMonstersList } from "../component_view_models/skill_details_wtih_monsters_list";

export interface MonsterTypeDetailsPage {
    monsterTypeName: string;
    monsters: string[];
    skillDetailsWithMonstersList: SkillDetailsWithMonstersList[];
}