import Link from 'next/link'
import Layout from '../components/layout'
import { ExportedMonsterSanctuaryDataExplorerWebsite } from '../json-ld_objects/exportedmonstersanctuarydataexplorer_website'
import { ExportedMonsterSanctuaryDataExplorerContributors } from '../json-ld_objects/exportedmonstersanctuarydataexplorer_contributors_org'
import { MonsterSanctuaryVideoGame } from '../json-ld_objects/monster_sanctuary_video_game'
import { websiteURL } from '../constants'
import { WebPage, WithContext } from 'schema-dts'

export default function Home() {

  const webPageJSONLD: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "author": ExportedMonsterSanctuaryDataExplorerContributors,
    "about": MonsterSanctuaryVideoGame,
    "name": "Exported Monster Sanctuary Data Explorer Home Page",
    "description": "This is the home page of the Exported Monster Sanctuary Data Explorer site where users can select different list categories for more details about Monsters, Types, Elements and other game attributes about monsters in the Monster Sanctuary video game.",
    "url": websiteURL,
    "mainEntityOfPage": ExportedMonsterSanctuaryDataExplorerWebsite
  }

  return (
    <>
      <Layout pageName='Home Page' jsonldObject={webPageJSONLD}>
        <p>Welcome to the Monster Sanctuary Data Explorer home page.</p>
        <p>Select a list for more details.</p>
        <ul>
          <li><Link href='/monsters'>Basic Monsters List</Link></li>
          <li><Link href='/monster_types'>Monster Types</Link></li>
          <li><Link href='/elements'>Elements</Link></li>
          <li><Link href='/buffs'>Buffs</Link></li>
          <li><Link href='/debuffs'>Debuffs</Link></li>
          <li><Link href='/special_buffs'>Special Buffs</Link></li>
          <li><Link href='/items'>Items</Link></li>
          <li><Link href='/explore_abilities'>Explore Abilities</Link></li>
          <li><Link href='/skills'>Skills</Link></li>
        </ul>
      </Layout>
    </>
  )
}
