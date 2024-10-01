import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request) => {
  try {
    // Create a response object
    const response = NextResponse.json(
      { message: 'Logout successful' },
      { status: 200 }
    );

    // Clear the authentication token from the cookies
    response.cookies.set('token', '', { httpOnly: true, expires: new Date(0) });

    return response;
  } catch (error) {
    console.error('Error during logout:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
};
