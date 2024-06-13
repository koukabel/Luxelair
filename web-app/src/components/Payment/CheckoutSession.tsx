
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { gql, useMutation } from "@apollo/client";
import {
  Center,
  Button,
  Text
} from "@chakra-ui/react";

const stripePublishableKey = "pk_test_51PJd3M07GbaJqaEDWtBaETRYzha5dVydrINevHGkDOJZg64ixF8mPJkmE4Cbcj72BMD8pLQLJ7YCdUfy7UFYhxiG00fS1tuYJB"
if (!stripePublishableKey) {
  throw new Error("Stripe key is missing");
}

const stripePromise = loadStripe(stripePublishableKey);

const CREATE_CHECKOUT_SESSION = gql`
mutation CreateStripeCheckoutSession($userId: String!, $bookingId: String!, $currency: String!, $amount: Float!) {
    createStripeCheckoutSession(userId: $userId, bookingId: $bookingId, currency: $currency, amount: $amount)
  }
`;

const CheckoutSession = ({ amount, currency, bookingId, userId }) => {
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
    <Center className="grey-circle">
      <Button bg='#B4770A' w="7rem" mb="30px" color='white' onClick={handleCheckout} disabled={loading} >

        {loading ? "Traitement..." : "Payer"}
      </Button>
      {error && <Text>Error: {error.message}</Text>}
    </Center>
  );
};

export default CheckoutSession;
