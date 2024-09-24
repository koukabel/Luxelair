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
  InputRightElement,
  useToast,
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

export default function Authentication({ onSignUpClick }: props) {
  const router = useRouter();
  const CFaUserAlt = chakra(FaUserAlt);
  const CFaLock = chakra(FaLock);
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();

  const handleShowClick = () => setShowPassword(!showPassword);

  const [loginUser, setloginUser] = useState<LoginMutationVariables>({
    email: "",
    password: "",
  });

  function handleChange(e: any) {
    const { name, value } = e.target;
    setloginUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const [login] = useMutation<LoginMutation, LoginMutationVariables>(Login);

  const signIn = async () => {
    try {
      const loadingToastId = toast({
        title: "Chargement...",
        status: "info",
        duration: 1000,
        isClosable: false,
      });
      setTimeout(async () => {
        try {
          const { data } = await login({
            variables: {
              email: loginUser.email,
              password: loginUser.password,
            },
          });
          if (data && data.signIn) {
            toast.close(loadingToastId);
            toast({
              title: "Connexion réussie",
              description: "Vous êtes maintenant connecté(e).",
              status: "success",
              duration: 4000,
              isClosable: true,
            });

    
              router.push(`/`);
         
          }
        } catch (error) {
          toast.close(loadingToastId);
          toast({
            title: "Erreur lors de la connexion",
            description:
              "Une erreur s'est produite lors de connexion. Veuillez réessayer.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
        borderRadius="20px"
        boxShadow='box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;'
      >
        <Avatar bg="#B4770A" />
        <Heading color="#B4770A">Connectez-vous</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              signIn();
            }}
          >
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
                  <Input
                    type="email"
                    name="email"
                    placeholder="email"
                    onChange={handleChange}
                  />
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
                borderRadius="20px"
                type="submit"
                variant="solid"
                bg="#000000"
                width="full"
                color="white"
                _hover={{ bg: "#B4770A" }}
              >
                Se connecter
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}