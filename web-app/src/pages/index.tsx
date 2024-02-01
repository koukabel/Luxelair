import { ChakraProvider, Heading } from "@chakra-ui/react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import Card from "../components/Card";
import { Image } from "@chakra-ui/react";
import { gql, useQuery } from "@apollo/client";
import { AdsQuery } from "@/gql/graphql";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
 const cardArray = Array.from({ length: 6 }, (_, index) => <Card key={index} />);

const GET_ADS = gql`
  query Ads {
    ads {
      location
      price
      title
      description
      id
    }
  }
`;

export default function HomePage() {

 // const publishedAdsArray = useQuery<AdsQuery>(GET_ADS);

 // console.log(publishedAdsArray)
  return (
    <ChakraProvider>
        <Navbar/>
      <Box pos="relative">
        <Image
         
        
          objectFit="cover"
          src="welcomePage.png"
          alt="Welcome Page"
        />
        <Heading
          w="100%"
          pos="absolute"
          top="75%"
          left="60%"
          color="white"
          transform="translate(-50%,-50%)"
        >
          LuxeLair.. Où le bien-être commence{" "}
        </Heading>
      </Box>

      <SimpleGrid w="100%" padding="10" minChildWidth="200px" spacing="50px">
       
        {/* {publishedAdsArray?.ads ? (
            publishedAdsArray.ads.map((ad) => (
            <Card 
            key={ad.id}
            id={ad.id}
            title={ad.title}
            price={ad.price}
            
            />
        )
       } */}

{ cardArray }

      </SimpleGrid>
<Footer/>
    </ChakraProvider>
  );
}
