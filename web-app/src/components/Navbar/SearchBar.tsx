import { SearchAdQuery } from "@/gql/graphql";
import { gql, useLazyQuery } from "@apollo/client";
import { SearchIcon } from "@chakra-ui/icons";
import { Flex, Input, Divider, Center, Box, Text, Button } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";

const SEARCH_AD = gql`
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
    router.push(`/searchResults/search-results?location=${searchLocation}`);
  };

  return (

    <Flex margin="12rem 50px 20px;"  justifyContent="center">
      <Center b="1px solid" borderColor="blackAlpha.100" boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px" width="50%" borderRadius="5em">
        <Box p="1em" borderRadius="5em" flex='1'
          _hover={{
            background: "blackAlpha.100",
            color: "gray"
          }}>
          <Input outline="none" border="none"  bg="none" color="gray" fontSize="sm" placeholder="Votre destination..."
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)} />
        </Box>
        <Divider h="50%" orientation='vertical' />
        <Box p="1em" borderRadius="5em" flex='1'
          _hover={{
            background: "blackAlpha.100",
            color: "gray"
          }}>

          <Input
            placeholder="Départ"
            textAlign="center"
            border="none" 
            bg="none"
             fontSize="sm"
            type="date"
          />
        </Box>
        <Divider h="50%" orientation='vertical' />
        <Box p="1em" borderRadius="5em" flex='1'
          _hover={{
            background:"blackAlpha.100",
            color: "gray"
          }}>

          <Input
            textAlign="center"
             bg="none"
     
            border="none" color="gray" fontSize="sm"
            placeholder="Arrivée"
            type="date"
          />
        </Box>
        <Button onClick={handleSearch} backgroundColor="gray" borderRadius="50%" w="2vw" color="white" m="0.5em">
          <SearchIcon />
        </Button>
      </Center>
    </Flex>

    //   <Box marginTop="12rem" width="100%" borderRadius="20%" bg="red">
    //  <Flex alignItems="center" w="70%" paddingBottom="20px" m="auto">
    //     <Input
    //       placeholder="Rechercher une destination"
    //       size="md"
    //       fontFamily="Montserrat"
    //       fontWeight="regular"
    //       fontSize="12px"
    //       value={searchLocation}
    //       onChange={(e) => setSearchLocation(e.target.value)}
    //     />
    //     <Input
    //       placeholder="Départ"
    //       size="md"
    //       fontFamily="Montserrat"
    //       fontWeight="regular"
    //       fontSize="12px"
    //       type="date"
    //     />
    //     <Input
    //       placeholder="Arrivée"
    //       size="md"
    //       fontFamily="Montserrat"
    //       fontWeight="regular"
    //       fontSize="12px"
    //       type="date"
    //     />

    //     <IconButton
    //       colorScheme="gray"
    //       aria-label="Search database"
    //       icon={<SearchIcon />}
    //       onClick={handleSearch}
    //     />

    //   </Flex> 

    // </Box> 


  );
}
