import Link from 'next/link'
import Layout from '../components/layout'

export default function Home() {
  return (
    <>
      <Layout pageName='Home Page'>
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
