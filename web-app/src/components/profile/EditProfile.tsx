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
} from "@chakra-ui/react";

export default function EditProfile() {
	const { isOpen, onOpen, onClose } = useDisclosure();

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
							<FormLabel>Mon lieu de résidence</FormLabel>
							<Input placeholder="Entrez votre lieu de résidence" />
						</FormControl>

						<FormControl mt={4}>
							<FormLabel>Ma description</FormLabel>
							<Textarea placeholder="Décrivez-vous" />
						</FormControl>

						<FormControl mt={4}>
							<FormLabel>Numéro de téléphone</FormLabel>
							<Input placeholder="Votre numéro de téléphone" type="tel" />
						</FormControl>

						<FormControl mt={4}>
							<FormLabel>Email</FormLabel>
							<Input placeholder="Votre email" type="email" />
						</FormControl>

						<FormControl mt={4}>
							<FormLabel>Addresse</FormLabel>
							<Input placeholder="Votre addresse" type="addresse" />
						</FormControl>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme="blue" mr={3} onClick={onClose}>
							Fermer
						</Button>
						<Button variant="ghost">Modifier</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}
