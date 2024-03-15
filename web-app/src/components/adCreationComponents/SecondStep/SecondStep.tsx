import {
  Heading,
  Stack,
  Image,
  Text,
  Card,
  CardBody,
} from "@chakra-ui/react";

export default function SecondStep() {
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
        <CardBody w={"35vw"} >
          <Text  as="b">
            Étape 2
          </Text>
          <Heading lineHeight="2">Faites sortir votre annonce du lot</Heading>
          <Text py="2" fontSize="md" lineHeight="10" textAlign="justify">
            Au cours de cette étape, vous pourrez ajouter certains des
            équipements proposés dans votre logement et au moins 5 photos. Vous
            pourrez ensuite ajouter un titre et une description.
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
