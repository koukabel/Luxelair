import { useRouter } from "next/router";
import { ChakraProvider, Box, Heading, Text } from "@chakra-ui/react";
import { useQuery, gql } from "@apollo/client";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import SearchBar from "@/components/Navbar/SearchBar";
import Card from "../../components/Ad/Card";

const SEARCH_AD = gql`
  query FilterByPrice($min: Float!, $max: Float!) {
    filerByPrice(min: $min, max: $max) {
      id
      price
      location
      image
    }
  }
`;

export default function SearchHousingTypePage() {
  const router = useRouter();
  const { price } = router.query;

  const minPrice = typeof price === 'string' ? parseFloat(price.split(',')[0]) : 500;
  const maxPrice = typeof price === 'string' ? parseFloat(price.split(',')[1]) : 10000;
  
  const { loading, error, data } = useQuery(SEARCH_AD, {
    variables: {
      min: minPrice,
      max: maxPrice,
    },
  });

  return (
    <ChakraProvider>
      <Navbar />
      <SearchBar />
      <Box m="30px">
        <Heading as="h4" size="md">
          Résultats de la recherche pour logements:
        </Heading>
        {loading ? (
          <Text fontSize="md">Loading...</Text>
        ) : error ? (
          <Text pt="30px" fontSize="md">
            Aucun logement sur Luxelair ne correspond à vos critères
          </Text>
        ) : (
          <Box p="3rem" display="flex">
            {data?.filerByPrice.map((ad:any) => (
              <Card
                key={ad.id}
                id={ad.id}
                price={ad.price}
                 location={ad.location}
                image={`/file-hosting/${ad.id}.jpg`}
              />
            ))}
          </Box>
        )}
      </Box>
      <Footer />
    </ChakraProvider>
  );
}
