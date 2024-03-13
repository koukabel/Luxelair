import { SearchIcon } from "@chakra-ui/icons";
import { Flex, Input, Box } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";

export default function SearchBar() {
  return (
    <Box>
      <Flex alignItems="center" w="80%" paddingBottom="20px" m="auto">
        <Input
          placeholder="Rechercher une destination"
          size="md"
          fontFamily="Montserrat"
          fontWeight="regular"
          fontSize="12px"
        />
        <Input
          placeholder="Départ"
          size="md"
          fontFamily="Montserrat"
          fontWeight="regular"
          fontSize="12px"
          type="date"
        />
        <Input
          placeholder="Arrivée"
          size="md"
          fontFamily="Montserrat"
          fontWeight="regular"
          fontSize="12px"
          type="date"
        />
        <Input
          placeholder="Voyageurs"
          size="md"
          fontFamily="Montserrat"
          fontWeight="regular"
          fontSize="12px"
          type="number"
        />
        {/* dropdown */}

        <IconButton
          colorScheme="gray"
          aria-label="Search database"
          icon={<SearchIcon />}
        />
      </Flex>
    </Box>
  );
}
