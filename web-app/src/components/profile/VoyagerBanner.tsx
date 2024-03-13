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

export default function Banner() {
	return (
		<>
			<Flex gap={"20"}>
				<Flex>
					<Card maxW="sm" backgroundColor="#C3C3C3" w={300}>
						<CardBody>
							 <ProfileVoyageurImg /> 
							<Stack mt="6" spacing="3">
								<Heading size="md">Cédric | Voyageur</Heading>
								<Text>7 commentaires</Text>
								<Text>7 années sur Luxelair</Text>
							</Stack>
						</CardBody>
						<CardFooter></CardFooter>
					</Card>
				</Flex>
				<Flex flexDirection={"column"}>
					<Heading>Information sur Cédric</Heading>
					<EditProfile />
					<Text fontSize="2xl">Je vis à Paris</Text>
					<Text fontSize="1xl">
						Bonjour, je m'appelle Cédric <br /> Voyager dans les plus beaux
						lieux du monde <br /> en toute simplicité, c'est ma passion
						<br />A bientot sur Luxelair
					</Text>
				</Flex>
			</Flex>
		</>
	);
}
