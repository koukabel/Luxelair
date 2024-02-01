import React from "react";
import { Stack, Box, Flex, Input, Text, Image, Button } from "@chakra-ui/react";
import logo from '../../public/blackLogo.png';

export default function Navbar () {
	return (
		<Flex
			as="header"
			direction="column"
			align="center"
			justify="space-around"
			width="100%"
			p={4}
			bg="gray.100"
		>
			<Flex justify="space-between" width="100%">
				<Image
					src="blackLogo.png"
					boxSize="50px"
					objectFit="contain"
				/>

				<Stack direction="row" spacing={4}>
					{/* <button
						fontFamily="Montserrat"
						fontWeight="extrabold"
						fontSize="12px"
						color="#FFFFFF"
					>
						Mettre ma propriété sur Luxelair
					</button> */}
					{/* <button
						fontFamily="Montserrat"
						fontWeight="extrabold"
						fontSize="12px"
						color="#000000"
					>
						Se Connecter
					</button> */}
				</Stack>
			</Flex>
			<Flex justify="center" width="100%">
				<Stack direction="row" spacing={4}>
					<Input
						placeholder="Rechercher une destination"
						size="sm"
						fontFamily="Montserrat"
						fontWeight="regular"
						fontSize="12px"
					/>
					<Input
						placeholder="Départ"
						size="sm"
						fontFamily="Montserrat"
						fontWeight="regular"
						fontSize="12px"
						type="date"
					/>
					<Input
						placeholder="Arrivée"
						size="sm"
						fontFamily="Montserrat"
						fontWeight="regular"
						fontSize="12px"
						type="date"
					/>
					<Input
						placeholder="Voyageurs"
						size="sm"
						fontFamily="Montserrat"
						fontWeight="regular"
						fontSize="12px"
						type="number"
					/>
					{/* <button
						fontFamily="Montserrat"
						fontWeight="extrabold"
						fontSize="12px"
						color="#000000"
					>
						Rechercher
					</button> */}

            <Button m={2} variant='solid' bg='#B4770A' color='white' _hover={{ bg: '#000000' }}>
                Mettre mon annonce en ligne
            </Button>
				</Stack>
			</Flex>
		</Flex>
	);
};

