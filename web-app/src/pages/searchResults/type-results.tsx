import { useRouter } from "next/router";
import { ChakraProvider, Box, Heading, Text } from "@chakra-ui/react";
import { useQuery, gql } from "@apollo/client";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import SearchBar from "@/components/Navbar/SearchBar";
import Card from "../../components/Ad/Card";
import { Ad, FilterTypeQuery } from "@/gql/graphql";

const SEARCH_AD = gql`
query FilterByHouseType($type: String!) {
  filterByHouseType(type: $type) {
    id
    location
    image
    price
  }
}
`;

export default function SearchHousingTypePage() {
  const router = useRouter();
  const { type } = router.query;

  const { loading, error, data } = useQuery<FilterTypeQuery>(SEARCH_AD, {
    variables: { type: type as string },
  });

  return (
    <ChakraProvider>
    <Navbar />
    <SearchBar />
    <Box m="30px">
      <Heading as='h4' size='md'>Résultats de la recherche pour logements de type : {type}</Heading>
      {loading ? (
        <Text fontSize='md'>Loading...</Text>
      ) : error ? (
        <Text pt="30px" fontSize='md'>Aucun logement sur Luxelair ne correspond à vos critères</Text>
      ) : (
        <Box>
          {data?.filterByHouseType 
            ? data.filterByHouseType.map((ad:any) => (
              <Card
                key={ad.id} 
                id={ad.id}
                price={ad.price}
                location={ad.location}
                image={`/file-hosting/${ad.id}.jpg`}
              />
            ))
            : null}
        </Box>
      )}
    </Box>
    <Footer />
  </ChakraProvider>
  
  )
}
