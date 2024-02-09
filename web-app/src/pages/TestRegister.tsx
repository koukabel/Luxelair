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
import { gql, useMutation } from "@apollo/client";
import { CreateUserMutationVariables, CreateUserMutation } from "@/gql/graphql";


const CREATE_USER = gql`
mutation CreateUser(
  $email: String!, 
  $password: String!, 
  $firstName: String, 
  $lastName: String) {
  createUser(email: $email, password: $password, firstName: $firstName, lastName: $lastName) {
    email
    firstName
    lastName
    password
  }
}
`

export default function TestRegister() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [newUser, setnewUser] =useState<CreateUserMutationVariables>({
    firstName: '', 
    lastName: '' ,
    email: '',
    password: ''
})

function handleChange(e: any) {
  const { name, value} = e.target; 
  //convert string to number (price)
  setnewUser(prevState => ({
          ...prevState,
          [name]: value
  }));
}   

const [createUser ]= useMutation<
    CreateUserMutation,
    CreateUserMutationVariables
    >(CREATE_USER);

    const createNewUser = async () => {
      try {
      const { data } = await createUser({
          variables: {
              firstName: newUser.firstName,
              lastName: newUser.lastName,
              email: newUser.email,
              password: newUser.password
          },
      });
  } catch (error) {
          console.log(error)
      }
      
}    

  return (
    <ChakraProvider>
      <Container maxW="3xl">
        <Heading>Bienvenue sur Luxelair</Heading>
        <Heading>Inscription</Heading>
        <FormLabel m={2}>Prénom</FormLabel>
        <Input m={2} type="text" name="firstName" placeholder="Entrer votre prénom" onChange={handleChange} />
        <FormLabel m={2}>Nom</FormLabel>
        <Input m={2} type="text" name="lastName" placeholder="Entrer votre nom" onChange={handleChange} />
        <FormLabel m={2}>Email</FormLabel>
        <Input m={2} type="email" name="email" placeholder="Entrer votre email" onChange={handleChange} />
        <FormLabel m={2}>Mot de passe</FormLabel>
        <InputGroup size="md" m={2}>
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Entrer votre mot de passe"
            name="password"
            onChange={handleChange}
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
          onClick={createNewUser}
        >
          S'inscrire
        </Button>
      </Container>
      <Footer />
    </ChakraProvider>
  );
}
