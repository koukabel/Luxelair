// components/Layout.tsx
import { Box, Flex, Heading, Button, VStack } from "@chakra-ui/react";
import { ReactNode } from "react";

interface LayoutProps {
	children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	return (
		<Flex direction="column" h="100vh">
			<Flex
				justify="space-between"
				align="center"
				bg="#F6F6F6"
				p="4"
				color="#B4770A"
				w="100%"
				borderBottom={"1px"}
			>
				<Box p="2">LOGO</Box>
				<Heading size=" md">Gérer mes annonces</Heading>
				<Button colorScheme="red">Mettre ma propriété en ligne</Button>
			</Flex>
			<Flex flex="1" w="100%">
				{children}
			</Flex>
		</Flex>
	);
};

export default Layout;
