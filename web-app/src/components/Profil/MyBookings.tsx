
import { useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { HandlePaymentIntentSucceededWebhookMutation, HandlePaymentIntentSucceededWebhookMutationVariables, PaymentStatusEnum } from "@/gql/graphql";
import { Box, Text, Stack, Heading, Spinner, Alert, Flex, SimpleGrid, Image, Link, AlertIcon } from "@chakra-ui/react";

// const HANDLE_PAYMENT_INTENT_SUCCEEDED_WEBHOOK = gql`
//   mutation HandlePaymentIntentSucceededWebhook($bookingId: String!) {
//     handlePaymentIntentSucceededWebhook(bookingId: $bookingId)
//   }
// `;

export default function MyBookings() {
  
    // const router = useRouter();
    // const { id } = router.query;
    // const [confirmedBookings, setConfirmedBookings] = useState<string[]>([]);
    // const [failedBookings, setFailedBookings] = useState<string[]>([]);
    // const [handlePaymentIntentSucceeded, { loading, error }] = useMutation<
    //   HandlePaymentIntentSucceededWebhookMutation,
    //   HandlePaymentIntentSucceededWebhookMutationVariables
    // >(HANDLE_PAYMENT_INTENT_SUCCEEDED_WEBHOOK);

    // useEffect(() => {
    //   if (id) {
    //     handlePaymentIntentSucceeded({ variables: { bookingId: id as string } })
    //       .then(result => {
    //         if (result.data?.handlePaymentIntentSucceededWebhook === PaymentStatusEnum.Confirmed) {
    //           setConfirmedBookings(prev => [...prev, id as string]);
    //         } else if (result.data?.handlePaymentIntentSucceededWebhook === PaymentStatusEnum.Failed) {
    //           setFailedBookings(prev => [...prev, id as string]);
    //         }
    //       })
    //       .catch(err => {
    //         console.error("Error handling payment intent succeeded webhook:", err);
    //       });
    //   }
    // }, [id, handlePaymentIntentSucceeded]);
    // if (loading) return <Spinner />;
    // if (error) return (
    //   <Alert status="error">
    //     <AlertIcon />
    //     There was an error processing your request
    //   </Alert>
    // );
  
    return (
      <Box>
      
    </Box>
    );


}


