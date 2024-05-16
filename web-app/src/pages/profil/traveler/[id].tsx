import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import HoteBanner from "@/components/Profil/HostBanner";
import HostComments from "@/components/Profil/HostComments";
import { ChakraProvider, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import MyAds from "@/components/Profil/MyAds";
import { Divider } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import { UserQueryVariables, UserQuery } from "@/gql/graphql";
import VoyagerBanner from "@/components/Profil/VoyagerBanner";
import MyBookings from "@/components/Profil/MyBookings";

const GET_USER = gql`
  query User($userId: ID!) {
    user(id: $userId) {
      id
      lastName
      location
      phoneNumber
      firstName
      email
      description
      city
    }
  }
`;

export default function Traveler() {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useQuery<UserQuery, UserQueryVariables>(GET_USER, {
    variables: { userId: id as string },
  });
  if (data) {
    return (
      <ChakraProvider>
        <Navbar />
        <Stack m="auto" width="84%" mt={5} textAlign="left">
          <Flex
            flexDirection={"column"}
            justifyContent={"space-around"}
            gap={"8"}
          >
            <VoyagerBanner />
            <Divider />
            <MyBookings />
            <Divider />
            <HostComments />
          </Flex>
        </Stack>

        <Footer />
      </ChakraProvider>
    );
  }
}
