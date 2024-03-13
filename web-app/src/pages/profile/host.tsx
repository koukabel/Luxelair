import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import HoteBanner from "@/components/profile/HostBanner";
import { ChakraProvider, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import HoteVerify from "@/components/profile/HostVerify";
import { Link } from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";

export default function Host() {
	return (
		<ChakraProvider>
			<Navbar />
			<Stack spacing={4} m="auto" width="84%" mt={5} textAlign="left">
				<Flex flexDirection={"column"} justifyContent={"space-around"}>
					<HoteBanner />
				</Flex>
				<HoteVerify />
			</Stack>

			<Footer />
		</ChakraProvider>
	);
}
