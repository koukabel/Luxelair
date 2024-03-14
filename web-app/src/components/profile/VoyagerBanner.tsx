import {
	Card,
	CardBody,
	CardFooter,
	Divider,
	Flex,
	Heading,
	Link,
	Stack,
	Text,
} from "@chakra-ui/react";
import ProfileVoyageurImg from "../ProfileVoyageurImg";
import EditProfile from "./EditProfile";
import { gql, useQuery } from "@apollo/client";
import { GetMyProfilQuery } from "@/gql/graphql";

const GET_MY_PROFIL = gql`
query GetMyProfil {
	myProfile {
	  email
	  firstName
	  id
	  lastName
	  city
	  location
	  phoneNumber
	  description
	}
  }
`;

export default function Banner() {
	const { data, error } = useQuery<GetMyProfilQuery>(GET_MY_PROFIL);
	return (
		<>
			<Flex gap={"20"}>
				<Flex>
					<Card maxW="sm" backgroundColor="#C3C3C3" w={300}>
						<CardBody>
							 <ProfileVoyageurImg /> 
							<Stack mt="6" spacing="3">
								<Heading size="md">{data?.myProfile.firstName} | Voyageur</Heading>
								<Text>7 commentaires</Text>
								<Text>7 années sur Luxelair</Text>
							</Stack>
						</CardBody>
						<CardFooter></CardFooter>
					</Card>
				</Flex>
				<Flex flexDirection={"column"}>
					<Heading>Information sur {data?.myProfile.firstName}</Heading>
					<EditProfile /> 
					<Text fontSize="2xl">Je vis à {data?.myProfile.city}</Text>
					<Text fontSize="1xl">
					{data?.myProfile.description}
					</Text>
				</Flex>
			</Flex>
		</>
	);
}
