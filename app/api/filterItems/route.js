import axios from 'axios';
import { NextResponse } from 'next/server';

export const POST = async (request) => {
  console.log('reached');
  const terms = await request.json(); // Retrieve the JSON body
  let items = [];

  try {
    // Create an array of promises for each term
    const promises = Object.keys(terms).map(async (term) => {
      const queryBody = {
        sort_order: 'ASC',
        text_filter: terms[term],
      };
      // console.log(queryBody);

      const response = await axios.post(
        'https://connect.squareup.com/v2/catalog/search-catalog-items',
        queryBody,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_SQUARE_ACCESS_TOKEN_PROD}`,
            'Square-Version': '2024-08-21',
          },
        }
      );

      // Concatenate the items fetched for the current term
      if (response.data?.items) {
        items = items.concat(response.data.items);
      }
    });

    // Wait for all promises to resolve
    await Promise.all(promises);

    // Return the concatenated items
    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    console.log('errored');
    console.log(error);
    return NextResponse.error(error.response?.data || error.message);
  }
};
