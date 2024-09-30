import { Client, Environment } from 'square';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import fulfilledCredentials from '@/helpers/fulfilledCredentials';
import axios from 'axios';
import getCountryCode from '@/helpers/getCountryCode';

// Initialize the Square client
//check sandbox or production
const client = new Client({
  // accessToken: process.env.NEXT_SQUARE_ACCESS_TOKEN,
  accessToken:
    process.env.NEXT_SQUARE_ENVIRONMENT === 'production'
      ? process.env.NEXT_SQUARE_ACCESS_TOKEN_PROD
      : process.env.NEXT_SQUARE_ACCESS_TOKEN_DEV,
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

  if (!items || !sourceId || !customerCredentials) {
    return NextResponse.json('All fields are required', { status: 400 });
  }

  if (!fulfilledCredentials(customerCredentials)) {
    return NextResponse.json('Please fulfill all the required fields', {
      status: 400,
    });
  }
  const {
    firstName,
    lastName,
    company,
    address,
    apartment,
    city,
    postalCode,
    phone,
    country,
    email,
  } = customerCredentials;

  // 'Text me with news and offers', 'Email me with news and offers', 'Remember me'

  console.log(customerCredentials);

  // Generate a unique idempotency key
  const idempotency_key = uuidv4();

  const orderRequest = {
    idempotency_key,
    order: {
      location_id: process.env.NEXT_SQUARE_LOCATION_ID_DEV,
      customer_id: 'Z0CJC2BT3YG2GBSBGPRXQ45WC0',
      line_items: [
        {
          catalogObjectId: 'ACLRR4VOGB7TMMRC6TUN36I6', // Item ID
          base_price_money: {
            amount: 2000,
            currency: 'USD',
          },
          quantity: '1', // Ordering 1 unit of the item
          name: 'Test Item',
        },
        // {
        //   quantity: '1',
        //   base_price_money: {
        //     amount: 2000,
        //     currency: 'USD',
        //   },
        //   name: 'Test Item',
        //   uid: 'hghhgh7676gfgftburrfvv',
        // },
      ],
      state: 'OPEN',
      fulfillments: [
        {
          type: 'SHIPMENT',
          state: 'PROPOSED',
          shipment_details: {
            recipient: {
              display_name: `${firstName} ${lastName}`,
              address: {
                address_line_1: address,
                // address_line_2: 'Address line 2',
                // address_line_3: 'Address line 3',
                country: getCountryCode(
                  country.slice(0, 1).toUpperCase() + country.slice(1)
                ),
                first_name: firstName,
                last_name: lastName,
                locality: 'Pk',
                postal_code: postalCode.toString(),
              },
              email_address: email,
              phone_number: phone,
            },
          },
        },
      ],
    },
  };

  try {
    // Create the order
    const orderResponse = await axios.post(
      'https://connect.squareupsandbox.com/v2/orders',
      orderRequest,
      {
        headers: {
          'Square-Version': '2024-08-21',
          Authorization: `Bearer ${process.env.NEXT_SQUARE_ACCESS_TOKEN_DEV}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const order = orderResponse.data.order;
    // console.log(order);
    console.log(order.id);

    // Calculate total amount (ensure consistency with frontend)
    const totalAmount = 2000;

    // Prepare the payment request
    console.log('payment Reached');
    const paymentRequest = {
      sourceId,
      idempotencyKey: idempotency_key,
      amountMoney: {
        amount: totalAmount,
        currency: 'USD',
      },
      orderId: order.id,
    };

    // Create the payment
    return NextResponse.json(order.id, { status: 201 });
    const paymentResponse = await paymentsApi.createPayment(paymentRequest);
    // console.log(paymentResponse.result);

    // Convert BigInt to Number for serialization
    // const paymentResult = {
    //   ...paymentResponse.result,
    //   ...paymentResponse.result.payment,
    //         amountMoney: {
    //     ...paymentResponse.result.amountMoney,
    //     amount: Number(paymentResponse.result.amountMoney.amount),
    //   },
    //   totalMoney: {
    //     ...paymentResponse.result.totalMoney,
    //     amount: Number(paymentResponse.result.totalMoney.amount),
    //   },
    //   approvedMoney: {
    //     ...paymentResponse.result.approvedMoney,
    //     amount: Number(paymentResponse.result.approvedMoney.amount),
    //   },
    //   amountMoney: {
    //     ...paymentResponse.result.payment.amountMoney,
    //     amount: Number(paymentResponse.result.payment.amountMoney),
    //   },
    //   totalMoney: {
    //     ...paymentResponse.result.payment.totalMoney,
    //     amount: Number(paymentResponse.result.payment.totalMoney.amount),
    //   },
    //   approvedMoney: {
    //     ...paymentResponse.result.payment.approvedMoney,
    //     amount: Number(paymentResponse.result.payment.approvedMoney.amount),
    //   },
    // };

    // console.log(paymentResult)
    // Respond with the order and payment details
    return NextResponse.json(
      {
        success: true,
        // payment: paymentResult,
      },
      { status: 200 }
    );
  } catch (error) {
    // console.error('Error creating order or payment:', error);
    console.log('errored');

    // Handle Square API errors
    console.log(error.response?.data);
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
