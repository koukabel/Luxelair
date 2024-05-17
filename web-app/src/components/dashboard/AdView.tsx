import { Badge, Box, Image, SimpleGrid } from "@chakra-ui/react";
import { gql, useQuery } from "@apollo/client";
import { GetMyProfileQuery } from "@/gql/graphql";
import { GET_MY_PROFIL } from "@/pages/publishAd/CreateAdForm";

const GET_ADS_BY_USER = gql`
  query GetAdsByUser($getAdsByUserId: ID!) {
    getAdsByUser(id: $getAdsByUserId) {
      id
      image
      location
      price
      title
      housingType
      equipements
      description
    }
  }
`;
export default function AdView() {
  const { data: profileData, error } =
    useQuery<GetMyProfileQuery>(GET_MY_PROFIL);
  const { data } = useQuery(GET_ADS_BY_USER, {
    variables: {
      getAdsByUserId: profileData?.myProfile.id,
    },
  });
  return (
    <>
      <div>
        <h1>Mes Annonces en ligne !</h1>
      </div>
      <SimpleGrid columns={[2, null, 3]} spacing="40px">
        {data ? (
          data.getAdsByUser.map((ad) => (
            <Box
              maxW="sm"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
            >
              <Image src={`/file-hosting/${ad.id}.jpg`} alt={ad.title} />

              <Box p="6">
                <Box display="flex" alignItems="baseline">
                  <Badge borderRadius="full" px="2" colorScheme="teal">
                    New
                  </Badge>
                  <Box
                    color="gray.500"
                    fontWeight="semibold"
                    letterSpacing="wide"
                    fontSize="xs"
                    textTransform="uppercase"
                    ml="2"
                  >
                    beds &bull; baths
                  </Box>
                </Box>

                <Box
                  mt="1"
                  fontWeight="semibold"
                  as="h4"
                  lineHeight="tight"
                  noOfLines={1}
                >
                  {ad.title}
                </Box>

                <Box>
                  {ad.price}€
                  <Box as="span" color="gray.600" fontSize="sm">
                    /jour
                  </Box>
                </Box>
              </Box>
            </Box>
          ))
        ) : (
          <p>Vous avez aucune annonce en ligne</p>
        )}
      </SimpleGrid>
    </>
  );
}
