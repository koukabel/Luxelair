import {
  ChakraProvider,
  Box,
  Text,
  Heading,
  Stack,
  Button,
  Container,
  useBreakpointValue,
} from "@chakra-ui/react";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { useRouter } from "next/router";
import { CloseIcon } from "@chakra-ui/icons";

export default function Cancel() {
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
          <CloseIcon boxSize={50} color="red.500" />
          <Heading as="h1" size="xl" mt={4} color="red.500">
            Paiement Annulé
          </Heading>
          <Stack spacing={4} mt={4}>
            <Text fontSize="lg">
              Votre paiement a été annulé. Si vous avez besoin d'aide, veuillez
              contacter notre support client.
            </Text>
            <Text fontSize="md">
              Vous pouvez réessayer de procéder au paiement ou revenir à la page
              d'accueil.
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
