import axios from "axios";
import ReturnsAndShipping from "./ReturnPage";

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


        return <ReturnsAndShipping responseData={categoryResponse?.data?.objects} />;
    } catch (error) {
        console.log(error);
        return <div>Error: {error.message}</div>;
    }
}