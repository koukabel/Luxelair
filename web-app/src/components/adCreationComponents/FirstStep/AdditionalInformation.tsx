import {
  Grid,
  Button,
  Heading,
  Input,
  VStack,
  Text,
  GridItem,
  Flex,
  Divider,
} from "@chakra-ui/react";

export default function AdditionalInformation() {
  return (
    <VStack>
      <Heading>
        Donnez les informations principales concernant votre logement
      </Heading>
      <Grid
        templateColumns="repeat(1, 1fr)"
        gap={4}
        margin={"10"}
        w={"100vw"}
        p={"20"}
      >
        <GridItem maxW="" display={"flex"} justifyContent={"space-around"}>
          <Text>Voyageurs</Text>
          <Flex alignItems={"center"} justifyContent={"center"}>
            <Button borderRadius={"50"}>+</Button>
            <Text>1</Text>
            <Button borderRadius={"50"}>-</Button>
          </Flex>
        </GridItem>

          <Divider />
        <GridItem maxW="" display={"flex"} justifyContent={"space-around"}>
          <Text>Chambres</Text>
          <Flex alignItems={"center"} justifyContent={"center"}>
            <Button borderRadius={"50"}>+</Button>
            <Text>1</Text>
            <Button borderRadius={"50"}>-</Button>
          </Flex>
        </GridItem>

        <Divider />

        <GridItem maxW="" display={"flex"} justifyContent={"space-around"}>
          <Text>Lits</Text>
          <Flex alignItems={"center"} justifyContent={"center"}>
            <Button borderRadius={"50"}>+</Button>
            <Text>1</Text>
            <Button borderRadius={"50"}>-</Button>
          </Flex>
        </GridItem>
        <Divider />
        <GridItem maxW="" display={"flex"} justifyContent={"space-around"}>
          <Text>Salles de bain</Text>
          <Flex alignItems={"center"} justifyContent={"center"}>
            <Button borderRadius={"50"}>+</Button>
            <Text>1</Text>
            <Button borderRadius={"50"}>-</Button>
          </Flex>
        </GridItem>
      </Grid>
    </VStack>
  );
}
