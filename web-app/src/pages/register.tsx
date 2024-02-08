import {
  ChakraProvider,
  Heading,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Container,
} from "@chakra-ui/react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useState } from "react";

export default function CreateAdForm() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <ChakraProvider>
      <Navbar />
      <Container maxW="3xl">
        <Heading>Bienvenue sur Luxelair</Heading>
        <Heading>Inscription</Heading>
        <FormLabel m={2}>Prénom</FormLabel>
        <Input m={2} type="text" placeholder="Entrer votre prénom" />
        <FormLabel m={2}>Nom</FormLabel>
        <Input m={2} type="text" placeholder="Entrer votre nom" />
        <FormLabel m={2}>Email</FormLabel>
        <Input m={2} type="email" placeholder="Entrer votre email" />
        <FormLabel m={2}>Mot de passe</FormLabel>
        <InputGroup size="md" m={2}>
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Entrer votre mot de passe"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Button
          m={2}
          variant="solid"
          bg="#000000"
          color="white"
          _hover={{ bg: "#B4770A" }}
        >
          S'inscrire
        </Button>
      </Container>
      <Footer />
    </ChakraProvider>
  );
}
