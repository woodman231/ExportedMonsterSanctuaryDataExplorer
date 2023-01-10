import Layout from "../components/layout";
import {WithContext, AboutPage as AboutPageSchema} from 'schema-dts'
import { ExportedMonsterSanctuaryDataExplorerWebsite } from '../json-ld_objects/exportedmonstersanctuarydataexplorer_website'
import { ExportedMonsterSanctuaryDataExplorerContributors } from '../json-ld_objects/exportedmonstersanctuarydataexplorer_contributors_org'
import { websiteURL } from '../constants'

const AboutPage = () => {

    const webPageJSONLD: WithContext<AboutPageSchema> = {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "author": ExportedMonsterSanctuaryDataExplorerContributors,
        "about": ExportedMonsterSanctuaryDataExplorerWebsite,
        "url": websiteURL + '/about',
        "name": "About the ExportedMonsterSanctuaryDataExplorer site",
        "description": "This page gives details regarding the ExportedMonsterSanctuaryDataExplorer site.",
        "isPartOf": ExportedMonsterSanctuaryDataExplorerWebsite
    }

    return (
        <>
            <Layout pageName="About" jsonldObject={webPageJSONLD}>
                <p>
                    This site was created by a fan of the game. I am not associated with <a href="https://monster-sanctuary.com/press/index.php">Moi Rai games</a> the developer, nor <a href="https://www.team17.com/">Team 17</a> the publisher.
                </p>
                <p>
                    I created this site because Monster Sanctuary has allot of data and possibly synergies. But I have a hard time remembering things and piecing them together. I thought by linking data together on web pages would help ease my short term memory strain from playing the game.
                </p>
                <p>
                    I extracted the data by creating a <a href="https://github.com/BepInEx/BepInEx">BepInEx</a> plugin.
                </p>
                <p>
                    I then created a program to analyze the structure of the exported data which generated TypeScript interfaces. I used the TypeScript interfaces to write a directory client to more easily pull the data.
                </p>
                <p>
                    Finally, I used next.js to build the site as a static site, and hosted it on GitHub using GitHub pages.
                </p>
                <p>
                    Links to the relevant repositories or packages:
                </p>
                <ul>
                    <li><a href="https://github.com/woodman231/ExportedMonsterSanctuaryDataExplorer">GitHub Repository of this Site</a></li>
                    <li><a href="https://github.com/woodman231/AddAndExportAllMonsters">GitHub Repository for the BepInEx plugin that I wrote</a></li>
                    <li><a href="https://github.com/woodman231/ExportedMonsterSanctuaryData">GitHub Repository that stores the results of executing the BepInEx plugin</a></li>
                    <li><a href="https://www.npmjs.com/package/@woodman231/exportedmonstersanctuarydata">@woodman231/ExportedMonsterSanctuaryData</a> npm package</li>
                    <li><a href="https://github.com/woodman231/ExportedMonsterSanctuaryDataTypesBuilder">GitHub Repository that analyzes the exported data and creates TypeScript interfaces</a></li>
                    <li><a href="https://www.npmjs.com/package/@woodman231/exportedmonstersanctuarydatatypesgenerator">@woodman231/exportedmonstersanctuarydatatypesgenerator</a> npm package</li>
                    <li><a href="https://github.com/woodman231/ExportedMonsterSanctuaryDataTypes">GitHub Repository that stores the results of the data types generator</a></li>
                    <li><a href="https://www.npmjs.com/package/@woodman231/exportedmonstersanctuarydatatypes">@woodman231/exportedmonstersanctuarydatatypes</a> npm package</li>
                    <li><a href="https://github.com/woodman231/ExportedMonsterSanctuaryDataClient">GitHub Repository that is a client for interacting with the ExportedMonsterSanctuaryData</a></li>
                    <li><a href="https://www.npmjs.com/package/@woodman231/exportedmonstermanctuarydataclient">@woodman231/exportedmonstermanctuarydataclient</a> npm package</li>
                </ul>
            </Layout>
        </>
    )
}

export default AboutPage;