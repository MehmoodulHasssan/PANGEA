import { Client, Environment } from 'square';

export const prod_client = new Client({
  accessToken: process.env.NEXT_SQUARE_ACCESS_TOKEN_PROD,
  environment: Environment.Production,
});

export const sandbox_client = new Client({
  accessToken: process.env.NEXT_SQUARE_ACCESS_TOKEN_DEV,
  environment: Environment.Sandbox,
});
