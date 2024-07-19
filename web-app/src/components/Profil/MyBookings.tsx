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

  useEffect(() => {
    if (data) {
      setConfirmedBookings(data.getSucceededBookings);
    }
  }, [data]);

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
          <SimpleGrid>
            {confirmedBookings.map((booking) => (
              <Link key={booking} href={`/booking/${booking}`}>
                <Text>{booking}</Text>
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
