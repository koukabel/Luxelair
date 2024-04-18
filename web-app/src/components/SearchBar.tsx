import { SearchAdQuery } from "@/gql/graphql";
import { gql, useLazyQuery } from "@apollo/client";
import { SearchIcon } from "@chakra-ui/icons";
import { Flex, Input, Box } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import FilterButton from "./FilterButton";
const SEARCH_AD = gql `
query SearchAd($location: String!) {
  search(location: $location) {
    title
    price
    location
    id
    description
  }
}
`;

export default function SearchBar() {
  const [searchLocation, setSearchLocation] = useState(""); 
  const [searchAd] = useLazyQuery<SearchAdQuery>(SEARCH_AD);

  const router = useRouter(); 

  const handleSearch = () => {
    searchAd({ variables: { location: searchLocation } });
    router.push(`/search-results?location=${searchLocation}`);
  };

  return (
    <Box>
      <Flex alignItems="center" w="80%" paddingBottom="20px" m="auto">
        <Input
          placeholder="Rechercher une destination"
          size="md"
          fontFamily="Montserrat"
          fontWeight="regular"
          fontSize="12px"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
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
          onClick={handleSearch}
        />
        <FilterButton/>
      </Flex>
    </Box>
  );
}