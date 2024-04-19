import { AbsoluteCenter, ChakraProvider, Heading } from "@chakra-ui/react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import Card from "../components/Card";
import { Image } from "@chakra-ui/react";
import { gql, useQuery } from "@apollo/client";
import { Ad, AdsQuery } from "@/gql/graphql";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import FilterSection from "@/components/FilterSection"
import { Divider } from '@chakra-ui/react'
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
console.log(data)
  return (
    <ChakraProvider>
      <Navbar />
      <SearchBar />    
      <Divider/>
      <FilterSection/>
      <Box pos="relative">
        <Image
          margin="auto"
          objectFit="cover"
          src="welcomePage.png"
          alt="Welcome Page"
        />

        <Heading
          w="100%"
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
                id={ad.id}
                price={ad.price}
                location={ad.location}
                image={`/file-hosting/${ad.id}.jpg`}
                // description={ad.description}
              />
            ))
          : null}
      </SimpleGrid>
      <Footer />
    </ChakraProvider>
  );
}