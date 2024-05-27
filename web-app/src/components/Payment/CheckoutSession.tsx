
 import React from "react";
 import { loadStripe } from "@stripe/stripe-js";
 import { gql, useMutation } from "@apollo/client";
 import {CustomCheckoutProvider} from '@stripe/react-stripe-js';
const stripePublishableKey = ('pk_test_51PJd3M07GbaJqaEDWtBaETRYzha5dVydrINevHGkDOJZg64ixF8mPJkmE4Cbcj72BMD8pLQLJ7YCdUfy7UFYhxiG00fS1tuYJB');
if (!stripePublishableKey) {
  throw new Error("Stripe publishable key is not defined in environment variables");
}

const stripePromise = loadStripe(stripePublishableKey);

 const CREATE_CHECKOUT_SESSION = gql`
mutation CreateStripeCheckoutSession($userId: String!, $bookingId: String!, $currency: String!, $amount: Float!) {
    createStripeCheckoutSession(userId: $userId, bookingId: $bookingId, currency: $currency, amount: $amount)
  }
`;  

 const CheckoutSession = ({amount , currency, bookingId, userId  }) => {
   const [createCheckoutSession, { loading, error }] = useMutation(CREATE_CHECKOUT_SESSION);

const handleCheckout = async () => {
  try {
    const { data } = await createCheckoutSession({
      variables: { amount, currency, bookingId, userId },
    });

    const sessionId = data.createStripeCheckoutSession;
    const stripe = await stripePromise;
    if (!stripe) {
      throw new Error("Failed to load Stripe.js");
    }
    
    const { error } = await stripe.redirectToCheckout({ sessionId });

    if (error) {
      console.error("Stripe checkout error:", error);
    }
  } catch (error) {
    console.error("Error during checkout:", error);
  }
};

   return (
     <div>
      <button onClick={handleCheckout} disabled={loading}>
         {loading ? "Loading..." : "Checkout"}
      </button>
      {error && <p>Error: {error.message}</p>}
    </div>
  );
 };

 export default CheckoutSession;
