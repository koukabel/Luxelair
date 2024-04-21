import { useRouter } from "next/router";
import { Box, SimpleGrid, ChakraProvider } from "@chakra-ui/react";
import Card from "../../components/Ad/Card";
import { gql, useQuery } from "@apollo/client";
import { SearchAdQuery } from "@/gql/graphql";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import SearchBar from "@/components/Navbar/SearchBar";

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


export default function SearchResultsPage() {
  const router = useRouter();
  const { location } = router.query;
  const { data } = useQuery<SearchAdQuery>(SEARCH_AD, {
    variables: { location: location as string },
  });

  return (
    <ChakraProvider>
              <Navbar />
      <SearchBar />
      <h1>Résultats de la recherche pour : {location}</h1>
      <SimpleGrid w="100%" padding="10" minChildWidth="200px" spacing="50px">
        {data?.search
          ? data.search.map((ad) => (
              <Card
                id={ad.id}
                price={ad.price}
                location={ad.location}
                image={`/file-hosting/${ad.id}.jpg`}
                // description={ad.description}
              />
            ))
          : null}
      </SimpleGrid>
      <Footer/>
      </ChakraProvider>
  );
};
