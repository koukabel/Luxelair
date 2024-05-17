import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import HoteBanner from "@/components/Profil/HostBanner";
import { ChakraProvider, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import MyAds from "@/components/Profil/MyAds";
import { Divider } from "@chakra-ui/react";
import HostComments from "@/components/Profil/HostComments";

export default function Host() {
	return (
		<ChakraProvider>
			<Navbar />
			<Stack m="auto" width="84%" mt={5} textAlign="left">
				<Flex
					flexDirection={"column"}
					justifyContent={"space-around"}
					gap={"8"}
				>
					<HoteBanner />
					<Divider />
					<MyAds categorieName="Mes annonces en ligne" />
					<Divider />
					<HostComments />
				</Flex>
			</Stack>

			<Footer />
		</ChakraProvider>
	);
}
