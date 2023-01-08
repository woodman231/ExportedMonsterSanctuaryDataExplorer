import { GetStaticProps, NextPage } from "next"
import Link from "next/link"
import Layout from "../../components/layout"
import ExportedMonsterSanctuaryDataClient from "@woodman231/exportedmonstermanctuarydataclient"
import ExtendedItem from "../../export_model_extensions/extended_item"

interface ItemsListHomePageProps {
    items: ItemProps[]
}

interface ItemProps {
    itemName: string;
    itemSlugifiedName: string;
}

const ItemsListHomePage: NextPage<ItemsListHomePageProps> = ({ items }) => {
    return (
        <>
            <Layout pageName="Items">
                <p>This page contains a basic list of the items available in the Monster Sanctuary video game.</p>
                <ul>
                    {
                        items.map((item, index) => {
                            return (
                                <li key={index}><Link href={'/items/' + item.itemSlugifiedName}>{item.itemName}</Link></li>
                            )
                        })
                    }
                </ul>
            </Layout>
        </>
    )
}

export const getStaticProps: GetStaticProps<ItemsListHomePageProps> = async (context) => {
    const dataClient = new ExportedMonsterSanctuaryDataClient();
    const itemObjects = await dataClient.itemsClient.getAllObjectsInDirectoryAsync();

    const sortedItemObjects = itemObjects.sort((a, b): number => {
        const itemAName = a.Name.toLowerCase();
        const itemBName = b.Name.toLowerCase();

        if (itemAName < itemBName) {
            return -1;
        }

        if (itemAName > itemBName) {
            return 1;
        }

        return 0;
    })

    let extendedItemObjects: ExtendedItem[] = [];

    sortedItemObjects.forEach((itemObject) => {
        extendedItemObjects.push(new ExtendedItem(itemObject));
    });

    return {
        props: {
            items: extendedItemObjects.map((extendedItemObject) => {
                return {
                    itemName: extendedItemObject.originalItemDetails.Name,
                    itemSlugifiedName: extendedItemObject.slugifiedName
                }
            })
        }
    }
}

export default ItemsListHomePage