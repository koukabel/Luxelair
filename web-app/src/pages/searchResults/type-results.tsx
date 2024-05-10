import { useRouter } from "next/router";
import { ChakraProvider, Box } from "@chakra-ui/react";
import { useQuery, gql } from "@apollo/client";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import SearchBar from "@/components/Navbar/SearchBar";
import Card from "../../components/Ad/Card";
import { FilterTypeQuery } from "@/gql/graphql";

const SEARCH_AD = gql`
query FilterByHouseType($type: String!) {
  filterByHouseType(type: $type) {
    id
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
      <Box m="4">
         <h1>Résultats de la recherche pour logements de type : {type}</h1>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          <Box>
            {data?.filterByHouseType 
           ? data.filterByHouseType.map((ad) => (
            <Card
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
  );
}
