import { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import {
  Box,
  Text,
  Stack,
  Heading,
  SimpleGrid,
  Link,
  Image,
} from "@chakra-ui/react";

const DISPLAY_CONFIRMED_BOOKINGS = gql`
  query Query($userId: String!) {
  getSucceededBookings(userId: $userId)
}
`;

export default function MyBookings() {
  const router = useRouter();
  const { id } = router.query;
  const [confirmedBookings, setConfirmedBookings] = useState<any[]>([]);

  const { data, loading, error } = useQuery(DISPLAY_CONFIRMED_BOOKINGS, {
    variables: { userId: id as string },
  });

  // useEffect(() => {
  //   if (data) {
  //     const confirmed: any[] = [];
  
  //     data.getBookingsByTraveller.forEach((booking: any) => {
  //       if (booking.payments.some((payment: any) => payment.status === "Confirmed")) {
  //         confirmed.push(booking);
  //       } 
      
  //     });

  //     setConfirmedBookings(confirmed);
   
  //   }
  // }, [data]);


  return (
    <Box>
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
              <Link key={booking.ad.id} href={`/booking/${booking.ad.id}`}>
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

    
      {confirmedBookings.length === 0  && (
        <Text>Vous n'avez pas de réservations</Text>
      )}
    </Box>
  );
}
