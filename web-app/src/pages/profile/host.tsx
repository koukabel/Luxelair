import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import HoteBanner from "@/components/profile/HostBanner";
import { ChakraProvider, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import MyAds from "@/components/profile/MyAds";
import { Divider } from "@chakra-ui/react";
import HostComments from "@/components/profile/HostComments";

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
					<MyAds />
					<Divider />
					<HostComments />
				</Flex>
			</Stack>

			<Footer />
		</ChakraProvider>
	);
}
