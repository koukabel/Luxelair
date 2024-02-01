import React from "react";
import {
  Stack,
  Box,
  Flex,
  Input,
  Text,
  Image,
  Button,
  Heading,
  MenuButton,
  Spacer,
  Link,
  Avatar,
} from "@chakra-ui/react";

export default function Navbar() {
  return (
    <Flex alignItems="center">
		<Link href="/">
      <Image src="logoWhite.png" boxSize="150px" objectFit="contain" />
      </Link>
	  <Heading color={"linear-gradient(to right, black, #B4770A)"}>
        LUXELAIR
      </Heading>
      <Spacer />
      <Flex direction="row" alignItems="center" gap={5}  padding="10">
        <Link
          fontFamily="Montserrat"
          fontWeight="extrabold"
          fontSize="16px"
          href="/CreateAdForm"
        >
          Mettre ma propriété sur Luxelair
        </Link>

        <Avatar bg="#B4770A" />
      </Flex>
    </Flex>
    
    // <Flex justify="center" width="100%">
    // 	<Stack direction="row" spacing={4}></Stack>
    // 		<Input
    // 			placeholder="Rechercher une destination"
    // 			size="sm"
    // 			fontFamily="Montserrat"
    // 			fontWeight="regular"
    // 			fontSize="12px"
    // 		/>
    // 		<Input
    // 			placeholder="Départ"
    // 			size="sm"
    // 			fontFamily="Montserrat"
    // 			fontWeight="regular"
    // 			fontSize="12px"
    // 			type="date"
    // 		/>
    // 		<Input
    // 			placeholder="Arrivée"
    // 			size="sm"
    // 			fontFamily="Montserrat"
    // 			fontWeight="regular"
    // 			fontSize="12px"
    // 			type="date"
    // 		/>
    // 		<Input
    // 			placeholder="Voyageurs"
    // 			size="sm"
    // 			fontFamily="Montserrat"
    // 			fontWeight="regular"
    // 			fontSize="12px"
    // 			type="number"
    // 		/>
    // 		{/* <button
    // 			fontFamily="Montserrat"
    // 			fontWeight="extrabold"
    // 			fontSize="12px"
    // 			color="#000000"
    // 		>
    // 			Rechercher
    // 		</button> */}

    // <Button w="100%" m={2} variant='solid' bg='#B4770A' color='white' _hover={{ bg: '#000000' }}>

    // </Button>

    // </Flex>
  );
}
