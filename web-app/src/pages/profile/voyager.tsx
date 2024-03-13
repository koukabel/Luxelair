import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import VoyagerBanner from "@/components/profile/VoyagerBanner";
import { ChakraProvider, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import VoyagerVerify from "@/components/profile/VoyagerVerify";
import { Link } from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";

export default function Voyager() {
	return (
		<ChakraProvider>
			<Navbar />
			<Stack spacing={4} m="auto" width="84%" mt={5} textAlign="left">
				<Flex flexDirection={"column"} justifyContent={"space-around"}>
					<VoyagerBanner />
				</Flex>
				<VoyagerVerify />
			</Stack>

			<Footer />
		</ChakraProvider>
	);
}
