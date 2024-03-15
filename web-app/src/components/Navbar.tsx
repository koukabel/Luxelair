import React from "react";
import {
	Flex,
	Image,
	Button,
	Heading,
	MenuButton,
	Spacer,
	Link,
	Avatar,
} from "@chakra-ui/react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { GetMyProfileQuery, SignOutMutation } from "@/gql/graphql";

const GET_MY_PROFIL = gql`
	query GetMyProfile {
		myProfile {
			email
			id
			firstName
			lastName
		}
	}
`;

export default function Navbar() {
	const { data, error } = useQuery<GetMyProfileQuery>(GET_MY_PROFIL);

	return (
		<Flex alignItems="center">
			<Link href="/">
				<Image src="../logoWhite.png" boxSize="150px" objectFit="contain" />
			</Link>
			<Heading className="mainHeading">LUXELAIR</Heading>
			<Spacer />
			<Flex direction="row" alignItems="center" gap={5} padding="10">
				<Link
					cursor={"pointer"}
					fontWeight="light"
					fontSize="16px"
					href={data?.myProfile ? "/CreateAdForm" : "/login"}
				>
					Mettre ma propriété sur Luxelair
				</Link>
				{data?.myProfile ? (
					<Link
						cursor={"pointer"}
						fontWeight="light"
						fontSize="16px"
						href={`/profile/traveler/${data?.myProfile.id}`}
					>
						<Avatar cursor="pointer" bg="#B4770A" />
					</Link>
				) : (
					<Link
						cursor={"pointer"}
						fontWeight="light"
						fontSize="16px"
						href="/login"
					>
						Connexion
					</Link>
				)}
			</Flex>
		</Flex>

		// <Flex justify="center" width="100%">
		// 	<Stack direction="row" spacing={4}></Stack>
		// 		<Input
		// 			placeholder="Rechercher une destination"
		// 			size="sm"
		// 			fontFamily="Montserrat"
		// 			fontWeight="regular"
		// 			fontSize="12px"
		// 		/>
		// 		<Input
		// 			placeholder="Départ"
		// 			size="sm"
		// 			fontFamily="Montserrat"
		// 			fontWeight="regular"
		// 			fontSize="12px"
		// 			type="date"
		// 		/>
		// 		<Input
		// 			placeholder="Arrivée"
		// 			size="sm"
		// 			fontFamily="Montserrat"
		// 			fontWeight="regular"
		// 			fontSize="12px"
		// 			type="date"
		// 		/>
		// 		<Input
		// 			placeholder="Voyageurs"
		// 			size="sm"
		// 			fontFamily="Montserrat"
		// 			fontWeight="regular"
		// 			fontSize="12px"
		// 			type="number"
		// 		/>
		// 		{/* <button
		// 			fontFamily="Montserrat"
		// 			fontWeight="extrabold"
		// 			fontSize="12px"
		// 			color="#000000"
		// 		>
		// 			Rechercher
		// 		</button> */}

		// <Button w="100%" m={2} variant='solid' bg='#B4770A' color='white' _hover={{ bg: '#000000' }}>

		// </Button>

		// </Flex>
	);
}
