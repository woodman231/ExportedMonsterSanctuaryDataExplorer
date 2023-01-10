import Layout from "../components/layout";
import {WithContext, WebPage} from 'schema-dts'
import { ExportedMonsterSanctuaryDataExplorerWebsite } from '../json-ld_objects/exportedmonstersanctuarydataexplorer_website'
import { ExportedMonsterSanctuaryDataExplorerContributors } from '../json-ld_objects/exportedmonstersanctuarydataexplorer_contributors_org'
import { websiteURL } from '../constants'

const PrivacyPage = () => {

    const webPageJSONLD: WithContext<WebPage> = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "author": ExportedMonsterSanctuaryDataExplorerContributors,
        "about": ExportedMonsterSanctuaryDataExplorerWebsite,
        "url": websiteURL + '/privacy',
        "name": "Privacy notice about using the ExportedMonsterSanctuaryDataExplorer site",
        "description": "This page gives details about the privacy policy while using the ExportedMonsterSanctuaryDataExplorer website.",
        "isPartOf": ExportedMonsterSanctuaryDataExplorerWebsite
    }

    return(
        <>
            <Layout pageName="Privacy" jsonldObject={webPageJSONLD}>
                <p>This site is statically rendered and hosted with no server side rendering. This site does use Google Anlaytics to help understand page views. See <a href="https://policies.google.com/technologies/partner-sites">Google Analytics Privacy and Terms</a> for more information.</p>                                
            </Layout>
        </>
    )
}

export default PrivacyPage;