import {
	GetMyProfilUpdateQuery,
	UpdateUserMutation,
	UpdateUserMutationVariables,
  } from "@/gql/graphql";
  import { gql, useMutation, useQuery } from "@apollo/client";
  import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
	Link,
	FormControl,
	FormLabel,
	Input,
	Textarea,
	useToast,
  } from "@chakra-ui/react";
  import { useState, useEffect } from "react";
  
  const GET_MY_PROFIL = gql`
	query GetMyProfilUpdate {
	  myProfile {
		email
		firstName
		id
		lastName
		location
		description
		city
		phoneNumber
	  }
	}
  `;
  
  const UPDATE_USER = gql`
	mutation UpdateUser(
	  $email: String!
	  $updateUserId: ID!
	  $description: String
	  $city: String
	  $location: String
	  $phoneNumber: String
	  $lastName: String!
	  $firstName: String!
	) {
	  updateUser(
		email: $email
		id: $updateUserId
		description: $description
		city: $city
		location: $location
		phoneNumber: $phoneNumber
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
  
  export default function EditProfile() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { data , refetch} = useQuery<GetMyProfilUpdateQuery>(GET_MY_PROFIL);
	const toast = useToast();
  
	const [updateUser, setupdateUser] = useState<UpdateUserMutationVariables>({
	  firstName: data?.myProfile.firstName as string,
	  lastName: data?.myProfile.lastName as string,
	  updateUserId: data?.myProfile.id as string,
	  email: data?.myProfile.email as string,
	  location: data?.myProfile.location || "",
	  city: data?.myProfile.city || "",
	  phoneNumber: data?.myProfile.phoneNumber || "",
	  description: data?.myProfile.description || "",
	});
  
	useEffect(() => {
	  if (data) {
		setupdateUser((prevState: any) => ({
		  ...prevState,
		  firstName: data.myProfile.firstName,
		  lastName: data.myProfile.lastName,
		  updateUserId: data.myProfile.id,
		  email: data.myProfile.email,
		  location: data?.myProfile.location || "",
		  city: data?.myProfile.city || "",
		  phoneNumber: data?.myProfile.phoneNumber || "",
		  description: data?.myProfile.description || "",
		}));
	  }
	}, [data]);
  
	function handleChange(e: any) {
	  const { name, value } = e.target;
	  setupdateUser((prevState) => ({
		...prevState,
		[name]: value,
	  }));
	}
  
	const [modifyUser] = useMutation<
	  UpdateUserMutation,
	  UpdateUserMutationVariables
	>(UPDATE_USER);
	const modifyNewUser = async () => {
	  try {
		const loadingToastId = toast({
		  title: "Chargement...",
		  status: "info",
		  duration: 500,
		  isClosable: false,
		});
		setTimeout(async () => {
		  try {
			const { data } = await modifyUser({
			  variables: {
				updateUserId: updateUser.updateUserId,
				firstName: updateUser.firstName,
				lastName: updateUser.lastName,
				email: updateUser.email,
				location: updateUser.location,
				phoneNumber: updateUser.phoneNumber,
				city: updateUser.city,
				description: updateUser.description,
			  },
			});
			if (data) {
			  toast.close(loadingToastId);
			  toast({
				title: "Modification effectuée",
				description: "Les nouvelles modifications ont bien été prises en compte",
				status: "success",
				duration: 2500,
				isClosable: true,
			  });
			  setTimeout(() => {
				onClose();
				refetch();
	
			  }, 1500);
			}
		  } catch (error) {
			toast.close(loadingToastId);
			toast({
			  title: "Erreur lors de la modification",
			  description:
				"Une erreur s'est produite lors de modification. Veuillez réessayer.",
			  status: "error",
			  duration: 5000,
			  isClosable: true,
			});
		  }
		}, 1000);
	  } catch (error) {
		console.log(error);
	  }
	};
  
	return (
	  <>
		<Link
		  onClick={onOpen}
		  _hover={{ textDecoration: "underline" }}
		  cursor="pointer"
		>
		  Modifier mon profil
		</Link>
		<Modal isOpen={isOpen} onClose={onClose}>
		  <ModalOverlay />
		  <ModalContent>
			<ModalHeader>Modifier mon profil</ModalHeader>
			<ModalCloseButton />
			<ModalBody>
			  <FormControl>
				<Input
				  type="hidden"
				  name="updateUserId"
				  value={updateUser.updateUserId}
				  onChange={handleChange}
				/>
				<FormLabel>Prénom</FormLabel>
				<Input
				  name="firstName"
				  value={updateUser.firstName ? updateUser.firstName : ""}
				  placeholder="Entrez votre prénom"
				  onChange={handleChange}
				/>
			  </FormControl>
			  <FormControl>
				<FormLabel>Nom</FormLabel>
				<Input
				  name="lastName"
				  value={updateUser.lastName ? updateUser.lastName : ""}
				  placeholder="Entrez votre nom"
				  onChange={handleChange}
				/>
			  </FormControl>
			  <FormControl mt={4}>
				<FormLabel>Email</FormLabel>
				<Input
				  name="email"
				  value={updateUser.email ? updateUser.email : ""}
				  placeholder=" Entrez votre email"
				  type="email"
				  onChange={handleChange}
				/>
			  </FormControl>
			  <FormControl mt={4}>
				<FormLabel>Ma description</FormLabel>
				<Textarea
				  name="description"
				  value={updateUser.description ? updateUser.description : ""}
				  placeholder="Décrivez-vous"
				  onChange={handleChange}
				/>
			  </FormControl>
  
			  <FormControl mt={4}>
				<FormLabel>Numéro de téléphone</FormLabel>
				<Input
				  name="phoneNumber"
				  value={updateUser.phoneNumber ? updateUser.phoneNumber : ""}
				  placeholder="Entrez votre numéro de téléphone"
				  type="tel"
				  onChange={handleChange}
				/>
			  </FormControl>

			  <FormControl mt={4}>
				<FormLabel>Adresse</FormLabel>
				<Input
				  name="location"
				  value={updateUser.location ? updateUser.location : ""}
				  placeholder="Entrez votre adresse"
				  type="addresse"
				  onChange={handleChange}
				/>
			  </FormControl>
			  <FormControl>
				<FormLabel>Ville de résidence</FormLabel>
				<Input
				  name="city"
				  value={updateUser.city ? updateUser.city : ""}
				  placeholder="Entrez votre ville de résidence"
				  onChange={handleChange}
				/>
			  </FormControl>
			</ModalBody>
  
			<ModalFooter>
			  <Button colorScheme="blue" mr={3} onClick={onClose}>
				Fermer
			  </Button>
			  <Button variant="ghost" onClick={modifyNewUser}>
				Modifier
			  </Button>
			</ModalFooter>
		  </ModalContent>
		</Modal>
	  </>
	);
  }