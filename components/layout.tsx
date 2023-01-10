import React from 'react';
import { Breadcrumb, Container } from 'react-bootstrap';
import SiteNavbar from './navbar'
import Disclaimer from './disclaimer'
import Head from 'next/head'
import Link from 'next/link';
import { Thing, WithContext } from 'schema-dts';

type Props = {
    pageName: string
    parents?: ParentPage[]
    jsonldObject?: WithContext<Thing>
    children: React.ReactNode
}

export type ParentPage = {
    pageName: string
    url: string
}

const siteName = "Monster Sanctuary Data Explorer"

const Layout = ({ pageName, parents, jsonldObject, children }: Props) => {
    return (
        <>
            <Container className="p-3">
                <Head>
                    <title>{`${siteName} | ${pageName}`}</title>
                    {
                        jsonldObject &&
                        <script
                            type="application/ld+json"
                            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonldObject) }}
                        />
                    }
                </Head>
                <SiteNavbar />
                <Container>
                    <Breadcrumb>
                        <Breadcrumb.Item href="/" linkAs={Link}>{siteName}</Breadcrumb.Item>
                        {
                            parents && parents.map((parent, index) => {
                                return (
                                    <Breadcrumb.Item key={index} href={parent.url} linkAs={Link}>{parent.pageName}</Breadcrumb.Item>
                                )
                            })
                        }
                        <Breadcrumb.Item active>{pageName}</Breadcrumb.Item>
                    </Breadcrumb>
                </Container>
                <header>
                    <h1>{pageName}</h1>
                </header>
                <main>
                    {children}
                </main>
                <footer>
                    <Disclaimer />
                </footer>
            </Container>
        </>
    )
}

export default Layout;