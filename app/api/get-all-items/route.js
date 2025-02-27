import axios from 'axios';
import { NextResponse, NextRequest } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// export default dynamic = 'force-dynamic';

export const GET = async (request) => {
  let items = [];
  let cursor = null;
  console.log('came to get-all-items route');
  // console.log(request);
  try {
    // do {
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
    // } while (cursor);
    // console.log('crossed');
    // const filePath = path.join(process.cwd(), 'data', 'output.json'); // Ensure the 'data' folder exists
    // const dirPath = path.dirname(filePath);

    // // Ensure the directory exists
    // await fs.mkdir(dirPath, { recursive: true });
    // await fs.writeFile(filePath, JSON.stringify(items, null, 2), 'utf8');

    // console.log(Object.values(items).slice(0, 6));
    // console.log('crossed');
    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    console.log(error);
    return error.message;
  }
};
