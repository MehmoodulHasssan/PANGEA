import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/User'; // Ensure User model is correctly imported
import { connectDb } from '@/configure/connectDb'; // Ensure correct path
import { Client, Environment } from 'square';

// Initialize the Square client
const client = new Client({
  accessToken:
    process.env.NEXT_SQUARE_ENVIRONMENT === 'production'
      ? process.env.NEXT_SQUARE_ACCESS_TOKEN_PROD
      : process.env.NEXT_SQUARE_ACCESS_TOKEN_DEV,
  environment:
    process.env.NEXT_SQUARE_ENVIRONMENT === 'production'
      ? Environment.Production
      : Environment.Sandbox,
});
// Connect to the database
await connectDb();

export const POST = async (request) => {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    // Check if the user exists
    const isUser = await User.findOne({ email }).exec();
    if (!isUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 400 });
    }

    // Check validity of password
    const validPassword = await isUser.comparePassword(password);
    if (!validPassword) {
      return NextResponse.json(
        { message: 'Invalid password' },
        { status: 400 }
      );
    }

    // getData from square Customer
    const customer = await client.customersApi.retrieveCustomer(
      isUser.customerId
    );

    const customerData = customer?.result.customer;
    console.log(customerData);
    // Generate JWT token
    const token = jwt.sign(
      {
        id: isUser._id,
        email: isUser.email,
        customerId: customerData?.id,
        firstName: customerData?.givenName,
        lastName: customerData?.familyName,
        address: customerData?.address?.addressLine1,
        phoneNumber: customerData?.phoneNumber,
        city: customerData?.address?.locality,
        country: customerData.address.country,
        postalCode: customerData.address.postalCode,
        phone: customerData?.address?.phoneNumber,
        companyName: customerData?.companyName,
      },
      process.env.NEXT_TOKEN_KEY,
      {
        expiresIn: '1d',
      }
    );

    // Set the token in a cookie and return success response
    const response = NextResponse.json({
      message: 'Login Successful',
      success: true,
      email: isUser.email,
    });
    response.cookies.set('token', token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NEXT_SQUARE_ENVIRONMENT === 'production',
    });

    return response;
  } catch (error) {
    console.error('Error during authentication:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
};
