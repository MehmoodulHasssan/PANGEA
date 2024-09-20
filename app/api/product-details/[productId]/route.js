// import axios from 'axios';
// import { NextResponse, NextRequest } from 'next/server';

// export const GET = async (request, { params }) => {
//   const { productId } = params; // Extract productId from URL parameters
//   console.log(`Fetching details for productId: ${productId}`);

//   try {
//     // Fetch the specific product by productId
//     const productResponse = await axios.get(
//       `https://connect.squareup.com/v2/catalog/object/${productId}`,
//       {
//         headers: {
//           Authorization:
//             'Bearer EAAAlsVtQA5CmiZu39b_6yP5QmfuX_r-poR4KQrRU1l9kcuuACiQibh9mJnY9YCP',
//           'Square-Version': '2023-08-16',
//           'Content-Type': 'application/json',
//         },
//       }
//     );

//     const product = productResponse.data.object;
//     // console.log(product);

//     const inventroyId = product?.item_variation_data?.item_id;
//     // const locationId = 'LH5YJXGQ5H5';
//     const locationId =
//       product?.item_variation_data.location_overrides[0].location_id;
//     console.log(locationId);
//     // Fetch inventory count for the product
//     const inventoryResponse = await axios.post(
//       'https://connect.squareup.com/v2/inventory/batch-retrieve-counts',
//       {
//         catalog_object_ids: [productId], // Array of catalog object IDs to fetch inventory counts for
//         location_ids: [locationId], // Array of location IDs to fetch inventory counts for
//       },
//       {
//         headers: {
//           Authorization:
//             'Bearer EAAAlsVtQA5CmiZu39b_6yP5QmfuX_r-poR4KQrRU1l9kcuuACiQibh9mJnY9YCP',
//           'Square-Version': '2023-08-16',
//           'Content-Type': 'application/json',
//         },
//       }
//     );

//     const inventory = inventoryResponse.data.counts;

//     // Combine product and inventory data
//     const productDetails = {
//       ...product,
//       inventory,
//     };

//     return NextResponse.json(productDetails); // Return the combined data;
//   } catch (error) {
//     console.log(error);
//     // console.log(error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// };

import axios from 'axios';
import { NextResponse } from 'next/server';

export const GET = async (request, { params }) => {
  const { productId } = params; // Extract productId from URL parameters
  console.log(`Fetching details for productId: ${productId}`);

  try {
    // Fetch the specific product by productId
    const productResponse = await axios.get(
      `https://connect.squareup.com/v2/catalog/object/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_SQUARE_ACCESS_TOKEN_PROD}`,
          'Square-Version': '2024-08-21',
          'Content-Type': 'application/json',
        },
      }
    );

    const product = productResponse.data.object;

    const inventoryId = product?.item_data?.variations[0]?.id;
    console.log(inventoryId);

    console.log('fetching inventory');
    const inventoryResponse = await axios.post(
      'https://connect.squareup.com/v2/inventory/batch-retrieve-counts',
      {
        catalog_object_ids: [inventoryId], // Array of catalog object IDs to fetch inventory counts for
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_SQUARE_ACCESS_TOKEN_PROD}`,
          'Square-Version': '2024-08-21',
          'Content-Type': 'application/json',
        },
      }
    );

    const inventory = inventoryResponse.data.counts;

    const recommendedQuery = {
      term1: 'Nuro Disposable 3ml - Broad Spec',
      term2: 'Candy 5ml',
    };
    console.log('sending post');
    const recommendedResponse = await axios.post(
      `${process.env.NEXT_VERCEL_DOMAIN_URL}/api/filterItems`,
      recommendedQuery
    );

    // Log the inventory response to debug issues
    // console.log('Inventory fetched:', inventory);

    // Combine product, inventory, and image data
    const productDetails = {
      ...product,
      inventory,
      recommendedItems: recommendedResponse?.data,
    };

    return NextResponse.json(productDetails, { status: 200 }); // Return the combined data
  } catch (error) {
    // Extract meaningful error information
    const errorMessage =
      error.response?.data?.message || error.message || 'Unknown error';

    // Log the error without causing circular reference issues
    console.error('Error fetching data:', errorMessage);

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
};
