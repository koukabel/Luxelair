import React from "react";
import { Box, Text, Image, VStack } from "@chakra-ui/react";
export default function Footer() {
	return (
		<Box
			as="footer"
			width="full"
			backgroundColor="black"
			color="white"
			paddingTop={5}
			paddingBottom={5}
			marginTop="auto"
		>
			<VStack spacing={6}>
				<Text fontSize="sm">© 2024 Luxelair. All rights reserved.</Text>
				<Image src="/logo_black.png" boxSize="30px" objectFit="contain" />
			</VStack>
		</Box>
	);
}
