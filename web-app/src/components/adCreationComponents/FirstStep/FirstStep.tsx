import {
  Heading,
  Stack,
  Image,
  Text,
  Flex,
  Box,
  Spacer,
  Grid,
  SimpleGrid,
  Container,
  HStack,
  Card,
  CardBody,
} from "@chakra-ui/react";

export default function FirstStep() {
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      border={"none"}
      p={50}
      margin={"auto"}
      display={"flex"}
      w={"70vw"}
    >
      <Stack>
        <CardBody w={"30vw"} lineHeight="2">
          <Text lineHeight="2" as="b">
            Étape 1
          </Text>
          <Heading lineHeight="2">Parlez-nous de votre logement</Heading>
          <Text py="2" fontSize="md" lineHeight="10" textAlign="justify">
            Au cours de cette étape, nous allons vous demander quel type de
            logement vous proposez et si les voyageurs pourront le réserver dans
            son intégralité ou si vous ne louez qu'une chambre. Nous vous
            demanderons ensuite d'indiquer son emplacement et sa capacité
            d'accueil.
          </Text>
        </CardBody>
      </Stack>
      <Image
        objectFit="cover"
        maxW="md"
        src="https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/accommodation-20-1.jpg"
        alt="Test image"
        w="100%"
        h="100%"
        m="auto"
      />
    </Card>
  );
}
