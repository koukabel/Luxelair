import {
	Card,
	CardBody,
	CardFooter,
	Divider,
	Heading,
	Link,
	Stack,
	Text,
} from "@chakra-ui/react";
// import ProfileImg from "../ProfileImg";

export default function Banner() {
	return (
		<>
			<Card maxW="sm" backgroundColor="#C3C3C3">
				<CardBody>
					{/* <ProfileImg /> */}
					<Stack mt="6" spacing="3">
						<Heading size="md">Béatrice | Voyageur</Heading>
						<Text>7 commentaires</Text>
						<Text>7 années sur Luxelair</Text>
					</Stack>
				</CardBody>
				<CardFooter></CardFooter>
			</Card>
			<Stack spacing={4} m="auto" width="84%" mt={5} textAlign="left">
				<Heading>Information sur Béatrice</Heading>
				<Link>Modifier mon profil</Link>
			</Stack>
			<Stack spacing={4} m="auto" width="84%" mt={5} textAlign="left">
				<Text fontSize="2xl">Je vis à Paris</Text>
				<Text fontSize="1xl">
					Bonjour, je m'appelle Béatrice <br /> Voyager dans les plus beaux
					lieux du monde <br /> en toute simplicité, c'est ma passion
					<br />A bientot sur Luxelair
				</Text>
			</Stack>
		</>
	);
}
