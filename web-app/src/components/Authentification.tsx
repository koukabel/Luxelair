import { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement
} from "@chakra-ui/react";
import { gql, useMutation } from "@apollo/client";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { LoginMutation, LoginMutationVariables } from "@/gql/graphql";
import { useRouter } from "next/router";

const Login = gql`
mutation Login($email: String!, $password: String!) {
  signIn(email: $email, password: $password) {
    email
    id
    firstName
    lastName
  }
}
`;

interface props {
    onSignUpClick: () => void; 
  }

export default function Authentification({ onSignUpClick } : props) {
    const router = useRouter();
    const CFaUserAlt = chakra(FaUserAlt);
    const CFaLock = chakra(FaLock);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  const [loginUser, setloginUser] = useState<LoginMutationVariables>({
    email: "",
    password: ""
  });

  function handleChange(e: any) {
    const { name, value } = e.target;
    setloginUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const [login] = useMutation<
    LoginMutation,
    LoginMutationVariables
  >(Login);

  const signIn = async () => {
    try {
      const { data } = await login({
        variables: {
          email: loginUser.email,
          password: loginUser.password,
        }
      });

   if (data && data.signIn) {
    router.push("/")
   }

    } catch (error) {
      console.log(error);
    }

  };

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Welcome</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form         onSubmit={(event) => {
          event.preventDefault();
          signIn();
        }}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input type="email" name="email" placeholder="email" onChange={handleChange} />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Mot de passe"
                    name="password"
                    onChange={handleChange}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText textAlign="right">
                  <Link onClick={onSignUpClick}>Sign Up</Link>
                </FormHelperText>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
              >
                Se connecter
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};
