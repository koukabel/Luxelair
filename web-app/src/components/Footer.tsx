import React from "react";
import { Box, Text, Image, VStack } from "@chakra-ui/react";
import logo from '../../public/blackLogo.png';
export default function Footer () {
	return (
		<Box
			as="footer"
			width="full"
			padding="20"
			backgroundColor="black"
			color="white"
			paddingTop={20}
			paddingBottom={20}
		>
			<VStack spacing={6}>
				<Text fontSize="sm">© 2024 Luxelair. All rights reserved.</Text>
				<Image
					src="blackLogo.png"
					boxSize="50px"
					objectFit="contain"
				/>
			</VStack>
		</Box>
	);
};

