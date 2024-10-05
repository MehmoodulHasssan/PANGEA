import ErrorPage from "@/components/ErrorPage";
import DetailsPage from "../DetailsPage";
import axios from "axios";

export default async function Page({ params }) {
    const { productId } = params
    console.log(productId)
    try {
        const itemsResponse = await axios.get(`${process.env.NEXT_VERCEL_DOMAIN_URL}/api/product-details/` + productId);

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

        const response = { itemsData: itemsResponse?.data, categories: categoryResponse?.data?.objects };
        // const dataArray = Object.values(response?.data);
        // const reversedDataArray = dataArray.reverse();

        return <DetailsPage data={response} />;

    } catch (error) {
        // console.log(error);
        return <ErrorPage statusCode={500} content={error?.message || 'Oops! Something went wrong'} />;
    }
}