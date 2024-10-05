import ErrorPage from "@/components/ErrorPage";
import ShopPage from "../ShopPage";
import axios from "axios";
// import { cookies } from "next/headers";

export default async function Page({ params }) {
    const { categoryId } = params
    console.log(categoryId)
    // const cookieStore = cookies(); // Get cookies from the request
    // const token = cookieStore.get('token'); // Fetch the 'token' cookie
    try {
        const dataResponse = await axios.post(
            `${process.env.NEXT_VERCEL_DOMAIN_URL}/api/search-items`,
            {
                categoryId,
                searchTerm: '',
            },
            {
                withCredentials: true,
            }
        );

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

        const response = { data: dataResponse?.data, categories: categoryResponse?.data?.objects };
        // console.log(response)
        // const dataArray = Object.values(response?.data);
        // const reversedDataArray = dataArray.reverse();

        return <ShopPage data={response} />;
    } catch (error) {
        console.log(error);
        return <ErrorPage statusCode={500} content={error?.message || 'Oops! Something went wrong'} />;
    }
}