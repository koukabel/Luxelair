import {
  ChakraProvider,
  Image,
  Text,
  Heading,
  Stack,
  Flex,
  Container,
  Box,
  Badge,
} from "@chakra-ui/react";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";

const MY_BOOKING_AD = gql`
  query GetBooking($getBookingId: String!) {
    getBooking(id: $getBookingId) {
      checkinDate
      checkoutDate
      datePayment
      id
      status
      statusPayment
      totalPrice
      ad {
        id
        housingType
        equipements
        description
        image
        price
        title
        location
      }
    }
  }
`;

export default function Booking() {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useQuery(MY_BOOKING_AD, {
    variables: { getBookingId: id as string },
  });
  console.log(data);
  if (data) {
    return (
      <ChakraProvider>
        <Navbar />
        <Box padding="5" width="80%" margin="auto">
          <Heading as="h2" size="xl" marginBottom="5">
            Ma réservation numéro {data.getBooking.id}
          </Heading>
          <Box
            position="relative"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
          >
            <Image
              height={"300px"}
              width={"310px"}
              objectFit={"cover"}
              src={data.getBooking.ad.image}
              alt={`Image de l'annonce ${data.getBooking.ad.title}`}
            />
            <Box position="absolute" top="2" right="2">
              {data.getBooking.statusPayment ? (
                <Badge colorScheme="green">Payé</Badge>
              ) : (
                <Badge colorScheme="red" borderRadius={8} padding={1}>
                  Non payé
                </Badge>
              )}
            </Box>
            <Box p="2">
              <Stack spacing={6}>
                <Text
                  fontWeight="bold"
                  fontSize="xl"
                  lineHeight="tight"
                  isTruncated
                  whiteSpace={"normal"}
                >
                  {data.getBooking.ad.title}
                </Text>
                <Text color="gray.500" fontSize="sm">
                  {data.getBooking.ad.description}
                </Text>
                <Text>
                  Date d'arrivée:{" "}
                  {new Date(data.getBooking.checkinDate).toDateString()}
                </Text>
                <Text>
                  Date de départ:{" "}
                  {new Date(data.getBooking.checkoutDate).toDateString()}
                </Text>
                <Text>Prix total: {data.getBooking.totalPrice} €</Text>
              </Stack>
            </Box>
          </Box>
        </Box>
        <Footer />
      </ChakraProvider>
    );
  }
}
