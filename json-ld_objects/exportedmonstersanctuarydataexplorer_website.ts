import { WebSite, WebPage } from "schema-dts";
import { ExportedMonsterSanctuaryDataExplorerContributors } from "./exportedmonstersanctuarydataexplorer_contributors_org";
import { MonsterSanctuaryVideoGame } from "./monster_sanctuary_video_game";

export const ExportedMonsterSanctuaryDataExplorerWebsite: WebSite = {
    "@type": "WebSite",
    "name": "Exported Monster Sanctuary Data Explorer",
    "url": "https://woodman231.github.io/ExportedMonsterSanctuaryDataExplorer",
    "mainEntity": {
        "@type": "WebPage",
        "name": "Exported Monster Sanctuary Data Explorer Home Page",
        "url": "https://woodman231.github.io/ExportedMonsterSanctuaryDataExplorer"
    } as WebPage,
    "author": ExportedMonsterSanctuaryDataExplorerContributors,
    "about": MonsterSanctuaryVideoGame
}