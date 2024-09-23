import axios from 'axios';
import { NextResponse } from 'next/server';

// This is the correct way to define a POST function in the app directory
export async function POST(request) {
  try {
    const reqBody = await request.json(); // Correct way to read the request body
    const { firstName, lastName, email, message } = reqBody;
    // console.log(firstName, lastName, email, message);

    // Basic validation for required fields
    if (!firstName || typeof lastName !== 'string' || !email) {
      return NextResponse.json(
        { error: 'Please fill the required fields' },
        { status: 400 }
      );
    }

    // Prepare data for JotForm API
    const formData = new FormData();
    formData.append('submission[3][first]', firstName); // JotForm First Name field ID
    formData.append('submission[3][last]', lastName); // JotForm Last Name field ID
    formData.append('submission[4]', email); // JotForm Email field ID
    formData.append('submission[7]', message || '');

    const response = await axios.post(
      `https://api.jotform.com/form/${process.env.NEXT_JOT_FORM_ID}/submissions?apiKey=${process.env.NEXT_JOT_API_KEY}`,
      formData
    );

    // Return a successful response
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.log(error);
    // Return an error response in case of a failure
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
