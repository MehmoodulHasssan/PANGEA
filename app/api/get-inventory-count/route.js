import { prod_client } from '@/components/shop-subcomponents/InitializeSquareClient';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const variationIds = await request.json();
  console.log(variationIds);
  try {
    let variationData = [];
    const response =
      await prod_client.inventoryApi.batchRetrieveInventoryCounts({
        catalogObjectIds: variationIds,
      });

    // console.log(response.result);

    variationIds.forEach((id, ind) => {
      variationData.push({
        id: id,
        varData: response?.result?.counts[ind],
      });
    });
    return NextResponse.json(variationData, { status: 200 });
  } catch (error) {
    console.log(error.message);
  }
}
