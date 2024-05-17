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
				border={"1px"}
				justifyContent={"center"}
			>
				<Flex fontWeight="700">Mode hôte - Gérer mes annonces</Flex>
			</Flex>
			<Flex flex="1" w="100%">
				{children}
			</Flex>
		</Flex>
	);
};

export default Layout;
