import Navbar from "@/components/Navbar";
import { ChakraProvider, Flex, Text, Link } from "@chakra-ui/react";

export default function custom404() {
  return (
    <ChakraProvider>
      <Navbar />
      <Flex flexDirection="column" alignItems="center" justifyContent="center">
        <Text fontSize="10rem" color="#B4770A" fontWeight={600}>
          404
        </Text>

        <Text fontSize="4rem" fontWeight={600}>
          Oups ! La page que vous demandez n'existe pas
        </Text>
      <Link marginTop="2rem" fontSize="2rem" color="#B4770A" href="/">
        Revenir à la page d'accueil
      </Link>
      </Flex>
    </ChakraProvider>
  );
}
