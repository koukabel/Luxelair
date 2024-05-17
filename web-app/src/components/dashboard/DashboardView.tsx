import {
  Card,
  CardBody,
  Container,
  Text,
  Divider,
  Flex,
} from "@chakra-ui/react";
import { GET_MY_PROFIL } from "@/pages/publishAd/CreateAdForm";
import { useQuery } from "@apollo/client";
import { GetMyProfilQuery } from "@/gql/graphql";

export default function DashboardView() {
  const { data } = useQuery<GetMyProfilQuery>(GET_MY_PROFIL);
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Bienvenue {data?.myProfile.firstName} !</p>
      <Flex justifyContent="left">
        <Card maxW="lm" width={"400px"}>
          <CardBody>
            <Flex flexDirection="column" width="100%" gap="4">
              <Flex justifyContent="space-between" width="100%">
                <Container>
                  <Text align="center" size="md">
                    Important ⚠️
                  </Text>
                </Container>
              </Flex>
              <Divider />

              <Flex
                justifyContent="space-between"
                width="100%"
                flexDirection={"column"}
                gap={"3"}
              >
                <Container>
                  <Text align="center" size="md">
                    Renseignez tous les détails à votre bien.
                  </Text>
                </Container>
                <Container>
                  <Text align="center" size="md" color={"red"}>
                    Étape obligatoire pour publier votre annonce.
                  </Text>
                </Container>
                <Container>
                  <Text align="center" size="md">
                    Les voyageurs effectuent la réservation 24h après la
                    publication de l'annonce.
                  </Text>
                </Container>
                <Divider />
                <Text align="center" size="md" fontWeight={"700"}>
                  Continuer la publication
                </Text>
              </Flex>
            </Flex>
          </CardBody>
        </Card>
      </Flex>
    </div>
  );
}
