import { GetBookingsByUserQuery } from "@/gql/graphql";
import { gql, useQuery } from "@apollo/client";
import { Box, Image, Text, Stack, Heading, SimpleGrid } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

export const MY_BOOKINGS = gql`
  query GetBookingsByUser($userId: String!) {
    getBookingsByUser(userId: $userId) {
      checkinDate
      checkoutDate
      datePayment
      id
      statusPayment
      totalPrice
      status
      ad {
        id
        image
        title
        description
      }
    }
  }
`;

export default function MyBookings() {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useQuery(MY_BOOKINGS, {
    variables: { userId: id as string },
  });
  return (
    <>
      {data ? (
        <Box padding="5">
          <Heading as="h2" size="xl" marginBottom="5"></Heading>
          <SimpleGrid columns={[1, null, 4]} spacing="120px">
            {data.getBookingsByUser.map((booking) => (
              <Link href={`/booking/${booking.id}`}>
                <Box
                  key={booking.id}
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  boxShadow="md"
                >
                  <Image
                    height={"300px"}
                    width={"310px"}
                    objectFit={"cover"}
                    src={booking.ad.image}
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
                    </Stack>
                  </Box>
                </Box>
              </Link>
            ))}
          </SimpleGrid>
        </Box>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
