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
	Button,
  } from "@chakra-ui/react";
  import Footer from "@/components/Footer/Footer";
  import Navbar from "@/components/Navbar/Navbar";
  import { useQuery, gql } from "@apollo/client";
  import { useRouter } from "next/router";
  import CheckoutSession from "@/components/Payment/CheckoutSession";
  
  // GetBooking , fetch the user id too
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
	  user {
		id
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
  
	if (data) {
	  return (
		<ChakraProvider>
		  <Navbar />
		  <Box padding="5" width="80%" margin="auto">
			<Heading as="h2" size="xl" marginBottom="5">
			  Ma réservation pour {data.getBooking.ad.location}
			</Heading>
			<Box
			  position="relative"
			  borderWidth="1px"
			  borderRadius="lg"
			  overflow="hidden"
			  boxShadow="md"
			>
			  <Flex alignItems="flex-start">
				<Image
				  height={"300px"}
				  width={"310px"}
				  objectFit={"cover"}
				  src={`/file-hosting/${data.getBooking.ad.id}.jpg`}
				  alt={`Image de l'annonce ${data.getBooking.ad.title}`}
				/>
				<Box marginLeft="4" flex="1">
				  <Box position="relative">
					{data.getBooking.statusPayment ? (
					  <Badge colorScheme="green">Payé</Badge>
					) : (
					  <Badge colorScheme="red" borderRadius={8} padding={1}>
						Non payé
					  </Badge>
					)}
				  </Box>
				  <Stack spacing={6} marginLeft="2">
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
					<CheckoutSession amount={data.getBooking.totalPrice} currency="eur" bookingId={data.getBooking.id} userId={data.getBooking.user.id} />
				  </Stack>
				</Box>
			  </Flex>
			</Box>
		  </Box>
	 
		  <Footer />
		</ChakraProvider>
	  );
	}
  }