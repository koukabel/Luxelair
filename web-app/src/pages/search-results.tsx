import { useRouter } from "next/router";
import { Box, SimpleGrid, ChakraProvider } from "@chakra-ui/react";
import Card from "../components/Card";
import { gql, useQuery } from "@apollo/client";
import { SearchAdQuery } from "@/gql/graphql";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";

const SEARCH_AD = gql `
query SearchAd($title: String!) {
  search(title: $title) {
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
  const { title } = router.query;
  const { data } = useQuery<SearchAdQuery>(SEARCH_AD, {
    variables: { title: title as string },
  });

  return (
    <ChakraProvider>
              <Navbar />
      <SearchBar />
      <h1>Résultats de la recherche pour : {title}</h1>
      <SimpleGrid w="100%" padding="10" minChildWidth="200px" spacing="50px">
        {data?.search
          ? data.search.map((ad) => (
              <Card
                id={ad.id}
                price={ad.price}
                location={ad.location}
                image={`/file-hosting/${ad.id}.jpg`}
                title={ad.title}
                // description={ad.description}
              />
            ))
          : null}
      </SimpleGrid>
      <Footer/>
      </ChakraProvider>
  );
};
