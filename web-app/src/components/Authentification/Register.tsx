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
  Avatar,
  FormControl,
  InputRightElement,
  useToast,
  FormHelperText,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { gql, useMutation } from "@apollo/client";
import { CreateUserMutation, CreateUserMutationVariables } from "@/gql/graphql";
import { useRouter } from "next/router";

const CREATE_USER = gql`
  mutation CreateUser(
    $email: String!
    $password: String!
    $lastName: String!
    $firstName: String!
  ) {
    createUser(
      email: $email
      password: $password
      lastName: $lastName
      firstName: $firstName
    ) {
      email
      firstName
      id
      lastName
    }
  }
`;

export default function Register() {
  const CFaUserAlt = chakra(FaUserAlt);
  const CFaLock = chakra(FaLock);
  const CMdAlternateEmail = chakra(MdAlternateEmail);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const toast = useToast();

  const handleShowClick = () => setShowPassword(!showPassword);

  const [newUser, setnewUser] = useState<CreateUserMutationVariables>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  function handleChange(e: any) {
    const { name, value } = e.target;
    setnewUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const [createUser] = useMutation<
    CreateUserMutation,
    CreateUserMutationVariables
  >(CREATE_USER);

  const createNewUser = async () => {
    try {
      const loadingToastId = toast({
        title: "Chargement...",
        status: "info",
        duration: 1000,
        isClosable: false,
      });
      setTimeout(async () => {
        try {
          if (newUser.password.length < 12) {
            toast.close(loadingToastId);
            throw new Error(
              "Le mot de passe doit faire au moins 12 caractères."
            );
          }
          const { data } = await createUser({
            variables: {
              firstName: newUser.firstName,
              lastName: newUser.lastName,
              email: newUser.email,
              password: newUser.password,
            },
          });

          if (data && data.createUser) {
            toast.close(loadingToastId);
            toast({
              title: "Inscription réussie",
              description: "Vous êtes maintenant inscrit(e).",
              status: "success",
              duration: 4000,
              isClosable: true,
            });

            setTimeout(() => {
              router.push("/");
            }, 2000);
          }
        } catch (error) {
          toast.close(loadingToastId);
          if (error instanceof Error) {
            toast({
              title: "Erreur lors de l'inscription",
              description: error.message,
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          } else {
            toast({
              title: "Erreur lors de l'inscription",
              description:
                "Une erreur s'est produite lors de la création de votre compte. Veuillez réessayer.",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          }
        }
      }, 1000);
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
        <Avatar bg="#B4770A" />
        <Heading color="#B4770A">Inscription</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <Stack
            spacing={4}
            p="1rem"
            backgroundColor="whiteAlpha.900"
            boxShadow="md"
          >
            <FormControl>
              <InputGroup>
                <InputLeftElement children={<CFaUserAlt color="gray.300" />} />
                <Input
                  type="text"
                  name="firstName"
                  placeholder="Entrer votre prénom"
                  onChange={handleChange}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <InputGroup>
                <InputLeftElement children={<CFaUserAlt color="gray.300" />} />
                <Input
                  type="text"
                  name="lastName"
                  placeholder="Entrer votre nom"
                  onChange={handleChange}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <InputGroup>
                <InputLeftElement
                  children={<CMdAlternateEmail color="gray.300" />}
                />
                <Input
                  type="email"
                  name="email"
                  placeholder="Entrer votre email"
                  onChange={handleChange}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <InputGroup>
                <InputLeftElement
                  color="gray.300"
                  children={<CFaLock color="gray.300" />}
                />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Entrer votre mot de passe"
                  name="password"
                  onChange={handleChange}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {newUser.password.length < 12 && (
                <FormHelperText color="red">
                  Le mot de passe doit comporter au moins 12 caractères.
                </FormHelperText>
              )}
            </FormControl>
            <Button
              variant="solid"
              bg="#000000"
              color="white"
              _hover={{ bg: "#B4770A" }}
              onClick={createNewUser}
            >
              S'inscrire
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
