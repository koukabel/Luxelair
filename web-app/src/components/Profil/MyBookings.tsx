import { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { Box, Text, Heading, SimpleGrid, Badge } from "@chakra-ui/react";
import { Ad } from "@/gql/graphql";
import Card from "../Ad/Card";
const DISPLAY_CONFIRMED_BOOKINGS = gql`
  query GetSucceededBookings($userId: String!) {
    getSucceededBookings(userId: $userId) {
      ad {
        id
        image
        location
        price
        title
      }
    }
  }
`;

export default function MyBookings() {
  const router = useRouter();
  const { id } = router.query;
  const [confirmedBookings, setConfirmedBookings] = useState<Ad[]>([]);

  const { data, loading, error } = useQuery(DISPLAY_CONFIRMED_BOOKINGS, {
    variables: { userId: id as string },
    skip: !id, // Skip query if id is not yet available
  });

  useEffect(() => {
    if (data?.getSucceededBookings) {
      // Extract `ad` objects from each booking
      const ads = data.getSucceededBookings.map((booking: any) => booking.ad);
      setConfirmedBookings(ads);
    }
  }, [data]);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Erreur de chargement</Text>;

  console.log(data);
  console.log(confirmedBookings);

  return (
    <Box>
      <Heading as="h2" size="xl" marginBottom="5">
        Mes réservations
      </Heading>

      {confirmedBookings.length > 0 ? (
        <>
          <Heading as="h3" size="md" marginBottom="3">
            Réservations confirmées
          </Heading>
          <SimpleGrid
            w="100%"
            padding="10"
            minChildWidth="200px"
            spacing="50px"
          >
            {confirmedBookings?.map((ad: Ad) => (
              <Box key={ad.id} position="relative">
                <Card
                  id={ad.id}
                  title={ad.title}
                  price={ad.price}
                  location={ad.location}
                  image={`/file-hosting/${ad.id}.jpg`}
                />
                <Badge
                  colorScheme="green"
                  borderRadius={8}
                  padding={1}
                  position="absolute"
                  top={2}
                  right={2}
                >
                 payé
                </Badge>
              </Box>
            ))}
          </SimpleGrid>
        </>
      ) : (
        <Text>Vous n'avez pas de réservations</Text>
      )}
    </Box>
  );
}


{/* <Box key={ad.id} position="relative">
<Card
  id={ad.id}
  price={ad.price}
  location={ad.location}
  image={`/file-hosting/${ad.id}.jpg`}
/>
<Badge
  colorScheme="green"
  borderRadius={8}
  padding={1}
  position="absolute"
  top={2}
  right={2}
>
 payé
</Badge>
</Box> */}