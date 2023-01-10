import { VideoGame } from "schema-dts";
import { MoiRaiGamesOrg } from "./moi_rai_games_org";
import { Team17Org } from "./team17_org";

export const MonsterSanctuaryVideoGame: VideoGame = {
    "@type": "VideoGame",
    "name": "Monster Sanctuary",
    "description": "A pixel art monster collecting game featuring metroidvania like sideview visuals, exploration and challenging turn based combat.",
    "url": "http://monster-sanctuary.com/",
    "author": MoiRaiGamesOrg,
    "publisher": Team17Org
}