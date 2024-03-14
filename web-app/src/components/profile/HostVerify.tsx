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
import ProfileImg from "../ProfileVoyageurImg";
import { gql, useQuery } from "@apollo/client";
import { GetMyProfileQuery } from "@/gql/graphql";


export default function VoyageurVerify() {

	return (
		<>
			<Flex justifyContent="left">
				<Card maxW="lm" width={"30%"}>
					<CardBody>
						<Flex flexDirection="column" width="100%" gap="4">
							<Flex justifyContent="space-between" width="100%">
								<Container>
									<Text align="center" size="md">
										Vérification effectué par 
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
