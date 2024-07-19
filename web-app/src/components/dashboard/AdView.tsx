import { Badge, Box, Image, SimpleGrid, Link } from "@chakra-ui/react";
import { gql, useQuery } from "@apollo/client";
import { GetMyProfileQuery } from "@/gql/graphql";
import { GET_MY_PROFIL } from "@/pages/publishAd/CreateAdForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTimes } from "@fortawesome/free-solid-svg-icons";

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
              key={ad.id}
              maxW="sm"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
            >
              <Image src={`/file-hosting/${ad.id}.jpg`} alt={ad.title} />

              <Box p="6">
                <Box mb="2">
                  {ad.equipements.map((equipement, index) => (
                    <Badge
                      key={index}
                      borderRadius="full"
                      px="2"
                      colorScheme="teal"
                      mr="2"
                      mb="2"
                    >
                      {equipement}
                    </Badge>
                  ))}
                </Box>

                <Box
                  mb="2"
                  color="gray.500"
                  fontWeight="semibold"
                  letterSpacing="wide"
                  fontSize="xs"
                  textTransform="uppercase"
                >
                  {ad.housingType}
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

                <Box display="flex" justifyContent="flex-end" mt="2">
                  <Link
                    href={`/dashboard/edit/${ad.id}`}
                    style={{ marginRight: "10px" }}
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </Link>
                </Box>
              </Box>
            </Box>
          ))
        ) : (
          <p>Vous n'avez aucune annonce en ligne.</p>
        )}
      </SimpleGrid>
    </>
  );
}
