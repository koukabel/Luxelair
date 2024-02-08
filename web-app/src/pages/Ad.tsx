import {
	ChakraProvider,
	Image,
	Text,
	Heading,
	Stack,
	Flex,
	Container,
} from "@chakra-ui/react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Slider from "@/components/Slider";
import Rating from "@/components/Rating";
import TagAd from "@/components/TagAd";
import Toggle from "@/components/Toggle";
import Payment from "@/components/Payment";
import ProfileImg from "@/components/ProfileImg";
import { gql } from "@apollo/client";

const GET_AD = gql`
	query Ad($adId: ID!) {
		ad(id: $adId) {
			id
			title
			price
			location
			description
		}
	}
`;

export default function Ad() {
	return (
		<ChakraProvider>
			<Navbar />
			<Slider />
			<Stack spacing={4} m="auto" width="84%" mt={5} textAlign="left">
				<Flex justifyContent="flex-start">
					<ProfileImg />
				</Flex>
				<TagAd />
				<Text fontSize="2xl">title</Text>
				<Text fontSize="1xl">Orléans, Val de Loire </Text>
				<Rating />
			</Stack>
			<Stack margin="3%">
				<Flex width={"100%"} justifyContent="space-around" alignItems="center">
					<Container alignContent={"center"}>
						<Toggle />
					</Container>
					<Container alignContent={"center"}>
						<Payment />
					</Container>
				</Flex>
			</Stack>
			<Footer />
		</ChakraProvider>
	);
}
