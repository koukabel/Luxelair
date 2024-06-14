
import { useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { HandlePaymentIntentSucceededWebhookMutation, HandlePaymentIntentSucceededWebhookMutationVariables, PaymentStatusEnum } from "@/gql/graphql";
import { Box, Text, Stack, Heading, Spinner, Alert, Flex, SimpleGrid, Image, Link, AlertIcon } from "@chakra-ui/react";

const HANDLE_PAYMENT_INTENT_SUCCEEDED_WEBHOOK = gql`
  mutation HandlePaymentIntentSucceededWebhook($bookingId: String!) {
    handlePaymentIntentSucceededWebhook(bookingId: $bookingId)
  }
`;

export default function MyBookings() {
  // const router = useRouter();
  // const { id } = router.query;
  // const [confirmedBookings, setConfirmedBookings] = useState<HandlePaymentIntentSucceededWebhookMutationVariables>({
  //   bookingId: id as string 
  // })
 

  // console.log(confirmedBookings)

  // // const confirmedBookings = data.getBookingsByUser.filter(
  // //   (booking) => booking.statusPayment
  // // );
  // // const pendingBookings = data.getBookingsByUser.filter(
  // //   (booking) => !booking.statusPayment
  // // );

  // return (
  //   <Box padding="5">
  //     <Heading as="h2" size="xl" marginBottom="5">
  //       Mes réservations
  //     </Heading>

  //     {confirmedBookings.length > 0 && (
  //       <>
  //         <Heading as="h3" size="md" marginBottom="3">
  //           Réservations confirmées
  //         </Heading>
  //         <SimpleGrid columns={[1, null, 4]} spacing="120px">
  //           {confirmedBookings.map((booking) => (
  //             <Link key={booking.id} href={`/booking/${booking.id}`}>
  //               <Box
  //                 borderWidth="1px"
  //                 borderRadius="lg"
  //                 overflow="hidden"
  //                 boxShadow="md"
  //                 cursor="pointer"
  //               >
  //                 <Image
  //                   height={"300px"}
  //                   width={"310px"}
  //                   objectFit={"cover"}
  //                   src={`/file-hosting/${booking.ad.id}.jpg`}
  //                   alt={`Image de l'annonce ${booking.ad.title}`}
  //                 />
  //                 <Box p="2">
  //                   <Stack spacing={6}>
  //                     <Text
  //                       fontWeight="bold"
  //                       fontSize="xl"
  //                       lineHeight="tight"
  //                       isTruncated
  //                       whiteSpace={"normal"}
  //                     >
  //                       {booking.ad.title}
  //                     </Text>
  //                     <Text color="gray.500" fontSize="sm">
  //                       {booking.ad.description}
  //                     </Text>
  //                     <Text fontWeight="bold" fontSize="md" color="green.500">
  //                       Réservation confirmée
  //                     </Text>
  //                   </Stack>
  //                 </Box>
  //               </Box>
  //             </Link>
  //           ))}
  //         </SimpleGrid>
  //       </>
  //     )}

      {/* {pendingBookings.length > 0 && (
        <>
          <Heading
            as="h3"
            size="md"
            marginTop={confirmedBookings.length > 0 ? "5" : "0"}
            marginBottom="3"
          >
            Réservations en attente
          </Heading>
          <SimpleGrid columns={[1, null, 4]} spacing="120px">
            {pendingBookings.map((booking: Booking) => (
              <Link key={booking.id} href={`/booking/${booking.id}`}>
                <Box
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  boxShadow="md"
                  cursor="pointer"
                >
                  <Image
                    height={"300px"}
                    width={"310px"}
                    objectFit={"cover"}
                    src={`/file-hosting/${booking.ad.id}.jpg`}
                    alt={`Image de l'annonce ${booking.ad.title}`}
                  />
                  <Box p="2">
                    <Stack spacing={6}>
                      <Text
                        fontWeight="bold"
                        fontSize="xl"
                        lineHeight="tight"
                        isTruncated
                        whiteSpace={"normal"}
                      >
                        {booking.ad.title}
                      </Text>
                      <Text color="gray.500" fontSize="sm">
                        {booking.ad.description}
                      </Text>
                      <Text fontWeight="bold" fontSize="md" color="red.500">
                        Réservation en attente
                      </Text>
                    </Stack>
                  </Box>
                </Box>
              </Link>
            ))}
          </SimpleGrid>
        </> 
      )}*/}

      {/* {confirmedBookings.length === 0 && pendingBookings.length === 0 && (
        <Text>Vous n'avez pas de réservations</Text>
      )} 
    </Box>*/}
  

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
            if (result.data?.handlePaymentIntentSucceededWebhook === PaymentStatusEnum.Confirmed) {
              setConfirmedBookings(prev => [...prev, id as string]);
            } else if (result.data?.handlePaymentIntentSucceededWebhook === PaymentStatusEnum.Failed) {
              setFailedBookings(prev => [...prev, id as string]);
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
            <Heading as="h3" size="md"> Réservations confirmées</Heading>
            {confirmedBookings.map(bookingId => (
              <Text key={bookingId}>Booking ID: {bookingId}</Text>
            ))}
          </Box>
        ) : (
          <Text>No confirmed bookings</Text>
        )}
        {failedBookings.length > 0 ? (
          <Box>
            <Heading as="h3" size="md"> Réservations en attente de paiement</Heading>
            <SimpleGrid columns={[1, null, 4]} spacing="120px">
            {failedBookings.map(bookingId => (
              // <Text key={bookingId}>Booking ID: {bookingId}</Text>
              <Link key={bookingId} href={`/booking/${bookingId}`}>
              <Box
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                boxShadow="md"
                cursor="pointer"
              >
                <Image
                  height={"300px"}
                  width={"310px"}
                  objectFit={"cover"}
                  src={`/file-hosting/${bookingId}.jpg`}
                  alt={`Image de l'annonce`}
                />
                <Box p="2">
                  <Stack spacing={6}>
                    <Text
                      fontWeight="bold"
                      fontSize="xl"
                      lineHeight="tight"
                      isTruncated
                      whiteSpace={"normal"}
                    >
                      Booking ID: {bookingId}
                    </Text>
                    <Text color="gray.500" fontSize="sm">
                      Description for booking ID {bookingId}
                    </Text>
                    {/* <Text fontWeight="bold" fontSize="md" color="green.500">
                      Réservation confirmée
                    </Text> */}
                  </Stack>
                </Box>
              </Box>
            </Link>
            ))}
            </SimpleGrid>
          </Box>
        ) : (
          <Text>No failed bookings</Text>
        )}
      </Stack>
    </Box>
    );


}


