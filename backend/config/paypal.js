import paypal from '@paypal/checkout-server-sdk';
import dotenv from 'dotenv';
dotenv.config({ path: "./.env.example" });

function environment() {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  if (process.env.NODE_ENV === 'production') {
    return new paypal.core.LiveEnvironment(clientId, clientSecret);
  } else {
    return new paypal.core.SandboxEnvironment(clientId, clientSecret);
  }
}

export function paypalClient() {
  return new paypal.core.PayPalHttpClient(environment());
}
