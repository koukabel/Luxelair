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

export default function Ad() {
	return (
		<ChakraProvider>
			<Navbar />
			<Slider />
			<Stack spacing={4} m="auto" width="84%" mt={5} textAlign="left">
				<TagAd />
				<Text fontSize="2xl">
					Grande Maison Familiale avec 1500m2 de terrain{" "}
				</Text>
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
