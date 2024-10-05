import axios from "axios";
import ContactPage from "./ContactPage";
import { prod_client } from "@/components/shop-subcomponents/InitializeSquareClient";

export const dynamic = "force-dynamic";

export default async function Page() {
    try {
        const categoryResponse = await axios.get(
            `https://connect.squareup.com/v2/catalog/list`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_SQUARE_ACCESS_TOKEN_PROD}`,
                    'Square-Version': '2023-08-16',
                    'Content-Type': 'application/json',
                },
                // params: cursor ? { cursor } : {},
                params: {
                    types: 'CATEGORY', // Fetch only objects of type ITEM
                },
            }
        );

        // const categoryResponse = await prod_client.catalogApi.listCatalog(undefined, 'CATEGORY');

        // console.log(categoryResponse?.result?.objects);


        return <ContactPage responseData={categoryResponse?.data?.objects} />;
    } catch (error) {
        console.log(error);
        return <div>Error: {error.message}</div>;
    }
}