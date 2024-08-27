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

import EditProfile from "./EditProfile";
import HostVerify from "./HostVerify";

export default function Banner() {
	return (
		<>
			<Flex gap={"20"}>
				<Flex>
					<Card maxW="sm" backgroundColor="#C3C3C3" w={300}>
						<CardBody>
						
							<Stack mt="6" spacing="3">
								<Heading size="md">Béatrice | Hote</Heading>
								<Text>17 commentaires</Text>
								<Text>2 années sur Luxelair</Text>
							</Stack>
						</CardBody>
						<CardFooter></CardFooter>
					</Card>
				</Flex>
				<HostVerify />

				<Flex flexDirection={"column"}>
					<Heading>Information sur Béatrice</Heading>
					<EditProfile />
					<Text fontSize="2xl">Je vis à Nice</Text>
					{/* <Text fontSize="1xl">
						Bonjour, je m'appelle Béatrice <br /> Je propose ma magnifique villa{" "}
						<br /> en toute simplicité, profitez de la mer
						<br />A bientot sur Luxelair
					</Text> */}
				</Flex>
			</Flex>
		</>
	);
}
