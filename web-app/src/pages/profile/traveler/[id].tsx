import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import VoyagerBanner from "@/components/profile/VoyagerBanner";
import { ChakraProvider, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import VoyagerVerify from "@/components/profile/VoyagerVerify";
import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import { UserQueryVariables, UserQuery } from "@/gql/graphql";


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
			<Stack spacing={4} m="auto" width="84%" mt={5} textAlign="left">
				<Flex flexDirection={"column"} justifyContent={"space-around"}>
					<VoyagerBanner />
				</Flex>
				<VoyagerVerify />
			</Stack>

			<Footer />
		</ChakraProvider>
	);
}}
