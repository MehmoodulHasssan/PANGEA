import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/User'; // Ensure correct path to your User model
import { connectDb } from '@/configure/connectDb'; // Ensure correct path to your database connection
import { Client, Environment } from 'square';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { last } from 'lodash';

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

export const POST = async (request) => {
  try {
    const reqBody = await request.json();
    const {
      firstName,
      lastName,
      email,
      password,
      address,
      phoneNumber,
      country,
      region,
      companyName,
      birthDate,
      postalCode,
    } = reqBody;
    console.log(reqBody);

    // Basic validation
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !address ||
      !phoneNumber ||
      !country ||
      !region ||
      !postalCode
    ) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    await connectDb();
    // Check if the user already exists
    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 }
      );
    }

    //Creating new customer on square
    const customer = await client.customersApi.createCustomer({
      idempotencyKey: uuidv4(),
      companyName: companyName || '',
      emailAddress: email,
      address: {
        locality: region,
        // administrativeDistrictLevel1: 'Punjab',
        postalCode: postalCode,
        country: country,
        firstName: firstName,
        lastName: lastName,
      },
      phoneNumber: phoneNumber,
      // referenceId: '3b0af9d0-5159-4093-8795-64082750bf4g',
      birthday: birthDate || '',
    });

    console.log(customer?.result);
    // Create a new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      customerId: customer?.result?.customer.id,
      password, // Password will be hashed by pre-save hook
    });

    // Save the user to the database
    await newUser.save();

    return NextResponse.json(
      { message: 'User registered successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.log('Error during signup:', error);
    return NextResponse.json(
      { message: 'Some Error has occurred, please try again...' },
      { status: 500 }
    );
  }
};
