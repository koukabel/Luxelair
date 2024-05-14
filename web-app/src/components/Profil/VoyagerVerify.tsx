import {
	Button,
	Card,
	CardBody,
	CardFooter,
	Container,
	Divider,
	Flex,
	Heading,
	Input,
	Link,
	Stack,
	Text,
} from "@chakra-ui/react";
// import ProfileImg from "../ProfileVoyageurImg";
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

export default function VoyageurVerify() {
	const { data, error } = useQuery<GetMyProfilQuery>(GET_MY_PROFIL);
	return (
		<>
			<Flex justifyContent="left">
				<Card maxW="lm" width={"300px"}>
					<CardBody>
						<Flex flexDirection="column" width="100%" gap="4">
							<Flex justifyContent="space-between" width="100%">
								<Container>
									<Text align="center" size="md">
										Vérification effectué par {data?.myProfile.firstName}
									</Text>
								</Container>
							</Flex>
							<Divider />

							<Flex
								justifyContent="space-between"
								width="100%"
								flexDirection={"column"}
							>
								<Container>
									<Text align="left" size="md">
										identité
									</Text>
								</Container>
								<Container>
									<Text align="left" size="md">
										numéro de téléphone
									</Text>
								</Container>
								<Container>
									<Text align="left" size="md">
										email
									</Text>
								</Container>
								<Container>
									<Text align="left" size="md">
										adresse
									</Text>
								</Container>
								<Divider />
							</Flex>
						</Flex>
					</CardBody>
				</Card>
			</Flex>
		</>
	);
}
