import {
  ChakraProvider,
  Box,
  Image,
  Text,
  Heading,
  Stack,
  Flex,
  Button,
  Container,
  useBreakpointValue,
} from "@chakra-ui/react";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { useRouter } from "next/router";
import { CheckCircleIcon } from "@chakra-ui/icons";

export default function Success() {
  const router = useRouter();

  const redirectToHome = () => {
    router.push("/");
  };

  return (
    <ChakraProvider>
      <Navbar />
      <Container
        maxW="container.md"
        padding="5"
        marginTop="10rem"
        centerContent
      >
        <Box
          padding="6"
          width="100%"
          borderWidth="1px"
          borderRadius="lg"
          boxShadow="md"
          textAlign="center"
          bg="white"
          mt={12}
        >
          <CheckCircleIcon boxSize={50} color="#B4770A" />
          <Heading as="h1" size="xl" mt={4} color="#B4770A">
            Paiement Réussi !
          </Heading>
          <Stack spacing={4} mt={4}>
            <Text fontSize="lg">
              Merci pour votre réservation. Votre paiement a été traité avec
              succès.
            </Text>
            <Text fontSize="md">
              Vous recevrez un email de confirmation avec les détails de votre
              transaction.
            </Text>
          </Stack>
          <Button
            bg="#000000"
            color="white"
            size="lg"
            mt={6}
            onClick={redirectToHome}
          >
            Retour à l'accueil
          </Button>
        </Box>
      </Container>
      <Footer />
    </ChakraProvider>
  );
}
