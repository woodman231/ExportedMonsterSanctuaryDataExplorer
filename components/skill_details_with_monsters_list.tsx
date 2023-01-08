import Link from "next/link";
import { SkillDetailsWithMonstersList } from "../component_view_models/skill_details_wtih_monsters_list";

const SkillDetailsWithMonstersListComponent: React.FC<{ skillDetailsWithMonstersList: SkillDetailsWithMonstersList }> = ({ skillDetailsWithMonstersList: skilledMonsters }) => {
    return (
        <dl>
            <dt>Skill Name</dt>
            <dd>{skilledMonsters.skillName}</dd>

            <dt>Skill Description</dt>
            <dd>{skilledMonsters.skillDescription}</dd>

            <dt>Monsters with skill</dt>
            <dd>
                <ul>
                    {
                        skilledMonsters.monsters.map((skilledMonster) => {
                            return (
                                <li key={skilledMonster}><Link href={'/monsters/' + skilledMonster}>{skilledMonster}</Link></li>
                            )
                        })
                    }
                </ul>
            </dd>
        </dl>
    )
};

export default SkillDetailsWithMonstersListComponent;