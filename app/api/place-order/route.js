import { Client, Environment } from 'square';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import fulfilledCredentials from '@/helpers/fulfilledCredentials';

// Initialize the Square client
const client = new Client({
  accessToken: process.env.NEXT_SQUARE_ACCESS_TOKEN,
  environment:
    process.env.NEXT_SQUARE_ENVIRONMENT === 'production'
      ? Environment.Production
      : Environment.Sandbox,
});

const ordersApi = client.ordersApi;
const paymentsApi = client.paymentsApi;

export async function POST(req) {
  const reqBody = await req.json();
  const { items, sourceId, customerCredentials } = reqBody;
  //   console.log('reqBody: ', reqBody);

  // Basic validation
  if (!items || !Array.isArray(items) || items.length === 0) {
    return NextResponse.json(
      {
        error: 'Items are required and should be an array.',
      },
      { status: 400 }
    );
  }

  if (!sourceId) {
    return NextResponse.json(
      {
        error: 'Payment token and sourceId are required.',
      },
      { status: 400 }
    );
  }

  if (!fulfilledCredentials(customerCredentials)) {
    return NextResponse.json(
      {
        error: 'Customer credentials are required.',
      },
      { status: 400 }
    );
  }

  // Generate a unique idempotency key
  const idempotency_key = `${new Date().getTime()}-${uuidv4()}`;

  // Prepare line items
  const lineItems = items.map((item) => ({
    uid: uuidv4(),
    catalog_object_id: item.product.id,
    catalog_version: item.product.version,
    name: item.product.item_data.name,
    quantity: item.quantity.toString(),
    base_price_money: {
      amount: item.amount, // Amount in smallest currency unit (e.g., cents)
      currency: 'USD',
    },
  }));

  // Prepare the order request payload
  const orderRequest = {
    idempotency_key,
    location_id: process.env.NEXT_SQUARE_LOCATION_ID,
    line_items: lineItems,
    item_type: 'ITEM',
    shipping_address: {
      address_line_1: customerCredentials.address,
      address_line_2: customerCredentials.apartment,
      locality: customerCredentials.city,
      postal_code: customerCredentials.postalCode,
      country: customerCredentials.country,
    },
    state: 'COMPLETED',
  };

  console.log(orderRequest);

  try {
    // Create the order
    const orderResponse = await ordersApi.createOrder(orderRequest);
    const order = orderResponse.result.order;

    // Calculate total amount (ensure consistency with frontend)
    const totalAmount = lineItems.reduce((total, item) => {
      return (
        total + parseInt(item.base_price_money.amount) * parseInt(item.quantity)
      );
    }, 0);

    // Prepare the payment request payload
    const paymentRequest = {
      sourceId,
      idempotency_key, // Must be unique
      amount_money: {
        amount: totalAmount, // Amount in smallest currency unit
        currency: 'USD',
      },
      order_id: order.id,
      autocomplete: true, // Automatically completes the payment
    };

    // Create the payment
    const paymentResponse = await paymentsApi.createPayment(paymentRequest);
    const payment = paymentResponse.result.payment;

    // Respond with the order and payment details
    return NextResponse.json(
      {
        success: true,
        order,
        payment,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error creating order or payment:', error);

    // Handle Square API errors
    if (error.response && error.response.errors) {
      return NextResponse.json(
        {
          error: error.response.errors,
        },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        {
          error: 'Internal server error',
        },
        { status: 500 }
      );
    }
  }
}
