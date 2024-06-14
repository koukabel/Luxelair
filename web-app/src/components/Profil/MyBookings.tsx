import { useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { HandlePaymentIntentSucceededWebhookMutation, HandlePaymentIntentSucceededWebhookMutationVariables, PaymentStatusEnum } from "@/gql/graphql";
import { Box, Text, Stack, Heading, Spinner, Alert, AlertIcon } from "@chakra-ui/react";

const HANDLE_PAYMENT_INTENT_SUCCEEDED_WEBHOOK = gql`
  mutation HandlePaymentIntentSucceededWebhook($bookingId: String!) {
    handlePaymentIntentSucceededWebhook(bookingId: $bookingId)
  }
`;

export default function MyBookings() {
  const router = useRouter();
  const { id } = router.query;
  const [confirmedBookings, setConfirmedBookings] = useState<string[]>([]);
  const [failedBookings, setFailedBookings] = useState<string[]>([]);
  const [handlePaymentIntentSucceeded, { loading, error }] = useMutation<
    HandlePaymentIntentSucceededWebhookMutation,
    HandlePaymentIntentSucceededWebhookMutationVariables
  >(HANDLE_PAYMENT_INTENT_SUCCEEDED_WEBHOOK);

  useEffect(() => {
    if (id) {
      handlePaymentIntentSucceeded({ variables: { bookingId: id as string } })
        .then(result => {
          console.log("Mutation result:", result);
          if (result.data?.handlePaymentIntentSucceededWebhook === "Confirmed") {
            setConfirmedBookings(prev => [...prev, id as string]);
          } else if (result.data?.handlePaymentIntentSucceededWebhook === PaymentStatusEnum.Failed) {
            setFailedBookings(prev => [...prev, id as string]);
          } else {
            console.log("Unhandled payment status:", result.data?.handlePaymentIntentSucceededWebhook);
          }
        })
        .catch(err => {
          console.error("Error handling payment intent succeeded webhook:", err);
        });
    }
  }, [id, handlePaymentIntentSucceeded]);

  if (loading) return <Spinner />;
  if (error) return (
    <Alert status="error">
      <AlertIcon />
      There was an error processing your request
    </Alert>
  );

  return (
    <Box>
      <Stack spacing={3}>
        <Heading as="h2" size="lg">Mes réservations</Heading>
        {confirmedBookings.length > 0 ? (
          <Box>
            <Heading as="h3" size="md">Réservations confirmées</Heading>
            {confirmedBookings.map(bookingId => (
              <Text key={bookingId}>Booking ID: {bookingId}</Text>
            ))}
          </Box>
        ) : <Text>aucune réservation confirmée</Text>}

        {failedBookings.length > 0 ? (
          <Box>
            <Heading as="h3" size="md">Réservations en attente de paiement</Heading>
            {failedBookings.map(bookingId => (
              <Text key={bookingId}>Booking ID: {bookingId}</Text>
            ))}
          </Box>
        ) : null}
      </Stack>
    </Box>
  );
}


