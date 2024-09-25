import { ChakraProvider, Heading } from "@chakra-ui/react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import Card from "../components/Ad/Card";
import { Image } from "@chakra-ui/react";
import { gql, useQuery } from "@apollo/client";
import { Ad, AdsQuery } from "@/gql/graphql";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import SearchBar from "@/components/Navbar/SearchBar";
import FilterSection from "@/components/Filters/FilterSection";
import { Divider } from "@chakra-ui/react";
const GET_ADS = gql`
  query Ads {
    getAds {
      location
      price
      title
      id
    }
  }
`;

export default function HomePage() {
  const { data } = useQuery<AdsQuery>(GET_ADS);
  return (
    <ChakraProvider>
      <Box height="100vh" display="flex" flexDirection="column">
        <Navbar />
        <SearchBar />
        <Divider />
        <FilterSection />
        <Box pos="relative">
          <Image
            margin="auto"
            p="10px"
            objectFit="cover"
            src="welcome_page.png"
            alt="Welcome Page"
          />

          <Heading
            w="50%"
            pos="absolute"
            top="80%"
            left="70%"
            color="white"
            transform="translate(-50%,-50%)"
          >
            LuxeLair.. Où le bien-être commence{" "}
          </Heading>
        </Box>

        <SimpleGrid w="100%" padding="10" minChildWidth="200px" spacing="50px">
          {data?.getAds
            ? data.getAds.map((ad) => (
                <Card
                  key={ad.id}
                  id={ad.id}
                  price={ad.price}
                  location={ad.location}
                  image={`/file-hosting/${ad.id}.jpg`}
                />
              ))
            : null}
        </SimpleGrid>
        <Footer />
      </Box>
    </ChakraProvider>
  );
}
