import { Booking } from "@/gql/graphql";
import { gql, useQuery } from "@apollo/client";
import { Box, Image, Text, Stack, Heading, SimpleGrid } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";


export const MY_BOOKINGS = gql`
mutation HandlePaymentIntentSucceededWebhook($bookingId: String!) {
  handlePaymentIntentSucceededWebhook(bookingId: $bookingId)
}
 
`;

export default function MyBookings() {
  const router = useRouter();
  const { id } = router.query;
  // const { data } = useQuery(MY_BOOKINGS, {
  //   variables: { bookingId: id as string },
  // });

  // if (!data) {
  //   return null;
  // }
//console.log(data)
const confirmedBookings: Booking[]= []
  // const confirmedBookings = data.getBookingsByUser.filter(
  //   (booking) => booking.statusPayment
  // );
  // const pendingBookings = data.getBookingsByUser.filter(
  //   (booking) => !booking.statusPayment
  // );

  return (
    <Box padding="5">
      <Heading as="h2" size="xl" marginBottom="5">
        Mes réservations
      </Heading>

      {confirmedBookings.length > 0 && (
        <>
          <Heading as="h3" size="md" marginBottom="3">
            Réservations confirmées
          </Heading>
          <SimpleGrid columns={[1, null, 4]} spacing="120px">
            {confirmedBookings.map((booking) => (
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
                      <Text fontWeight="bold" fontSize="md" color="green.500">
                        Réservation confirmée
                      </Text>
                    </Stack>
                  </Box>
                </Box>
              </Link>
            ))}
          </SimpleGrid>
        </>
      )}

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
      )} */}
    </Box>
  );
}
