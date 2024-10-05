// import HomePage from '@/app/HomePage';
// import axios from 'axios';
// // import { cookies } from 'next/headers';

// export const dynamic = 'force-dynamic';

// export default async function Page() {
//   // const cookieStore = cookies(); // Get cookies from the request
//   // const token = cookieStore.get('token'); // Fetch the 'token' cookie
//   try {
//     const itemsResponse = await axios.get(
//       `${process.env.NEXT_VERCEL_DOMAIN_URL}/api/get-all-items`,
//       {
//         withCredentials: true,
//       }
//     );

//     const categoryResponse = await axios.get(
//       `${process.env.NEXT_VERCEL_DOMAIN_URL}/api/get-all-categories`,
//       {
//         withCredentials: true,
//       }
//     );

//     const response = {
//       items: itemsResponse?.data,
//       categories: categoryResponse?.data,
//     };
//     // console.log(response.items);
//     // const dataArray = Object.values(response?.data);
//     // const reversedDataArray = dataArray.reverse();
//     return <HomePage data={response} />;
//   } catch (error) {
//     // console.log(error);
//     return <div>Error: {error.message}</div>;
//   }
// }

import axios from 'axios';
import { NextResponse, NextRequest } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import HomePage from './HomePage';
import ErrorPage from '@/components/ErrorPage';

// export default dynamic = 'force-dynamic';
export const dynamic = 'force-dynamic';

export default async function Page() {
  let items = [];
  let cursor = null;
  console.log('came to get-all-items route');
  // console.log(request);
  try {
    do {
      const response = await axios.get(
        `https://connect.squareup.com/v2/catalog/list`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_SQUARE_ACCESS_TOKEN_PROD}`,
            'Square-Version': '2024-09-19',
            'Content-Type': 'application/json',
          },
          // params: cursor ? { cursor } : {},
          params: {
            types: 'ITEM', // Fetch only objects of type ITEM
            cursor: cursor ? cursor : undefined, // Use cursor if available
          },
        }
      );

      items = items.concat(response?.data?.objects);
      cursor = response?.data?.cursor;
    } while (cursor);
    // console.log('crossed');
    // const filePath = path.join(process.cwd(), 'data', 'output.json'); // Ensure the 'data' folder exists
    // const dirPath = path.dirname(filePath);

    // // Ensure the directory exists
    // await fs.mkdir(dirPath, { recursive: true });
    // await fs.writeFile(filePath, JSON.stringify(items, null, 2), 'utf8');

    // console.log(Object.values(items).slice(0, 6));
    // console.log('crossed');
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

    const response = {
      items: items,
      categories: categoryResponse?.data?.objects,
    };
    return <HomePage data={response} />;
  } catch (error) {
    console.log(error);
    <ErrorPage
      statusCode={500}
      content={error.message || 'Oops! Something went wrong'}
    />;
  }
}
