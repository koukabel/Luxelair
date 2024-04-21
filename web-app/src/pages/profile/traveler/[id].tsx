import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar/Navbar";
import HoteBanner from "@/components/profile/HostBanner";
import HostComments from "@/components/profile/HostComments";
import { ChakraProvider, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import MyAds from "@/components/profile/MyAds";
import { Divider } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import { UserQueryVariables, UserQuery } from "@/gql/graphql";
import VoyagerBanner from "@/components/profile/VoyagerBanner"


const GET_USER = gql`
query User($userId: ID!) {
	user(id: $userId) {
	  id
	  lastName
	  location
	  phoneNumber
	  firstName
	  email
	  description
	  city
	}
  }
`;


export default function Traveler() {
	const router = useRouter();
	const { id } = router.query;
	const { data } = useQuery<UserQuery, UserQueryVariables>(GET_USER, {
		variables: { userId: id as string },
	});
	if (data) {
		return (
			<ChakraProvider>
				<Navbar />
				<Stack m="auto" width="84%" mt={5} textAlign="left">
					<Flex
						flexDirection={"column"}
						justifyContent={"space-around"}
						gap={"8"}
					>
						<VoyagerBanner />
						<Divider />
						<MyAds categorieName="Mes réservations" />
						<Divider />
						<HostComments />
					</Flex>
				</Stack>
	
				<Footer />
			</ChakraProvider>
		);
}}
