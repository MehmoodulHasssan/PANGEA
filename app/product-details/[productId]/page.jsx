import DetailsPage from "../DetailsPage";
import axios from "axios";

export default async function Page({ params }) {
    const { productId } = params
    console.log(productId)
    try {
        const itemsResponse = await axios.get(`${process.env.NEXT_VERCEL_DOMAIN_URL}/api/product-details/` + productId);

        const categoryResponse = await axios.get(
            `${process.env.NEXT_VERCEL_DOMAIN_URL}/api/get-all-categories`,
            {
                withCredentials: true,
            }
        );

        const response = { itemsData: itemsResponse?.data, categories: categoryResponse?.data };
        // const dataArray = Object.values(response?.data);
        // const reversedDataArray = dataArray.reverse();

        return <DetailsPage data={response} />;

    } catch (error) {
        // console.log(error);
        return <div>Error: {error.message}</div>;
    }
}