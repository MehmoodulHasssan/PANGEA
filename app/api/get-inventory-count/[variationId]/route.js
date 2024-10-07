import { prod_client } from '@/helpers/InitializeSquareClient';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { variationId } = params;
  try {
    const response = await prod_client.inventoryApi.retrieveInventoryCount(
      variationId,
      process.env.NEXT_SQUARE_LOCATION_ID_PROD
    );
    // console.log(response.result);
    return NextResponse.json(response.result, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
