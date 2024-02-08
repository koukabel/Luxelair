import { EquipmentTypeEnum, EquipmentValueInput } from "@/gql/graphql";
import { gql, useQuery } from "@apollo/client";
import {
  Card,
  CardHeader,
  Heading,
  SimpleGrid,
  Box,
  VStack,
} from "@chakra-ui/react";

const GET_EQUIPEMENTS = gql`
  query Query($equipmentTypes: [EquipmentTypeEnum!]!) {
    equipmentValues(equipmentTypes: $equipmentTypes)
  }
`;

export default function Equipements() {
  const { loading, error, data } = useQuery(GET_EQUIPEMENTS, {
    variables: {
      equipmentTypes: [
        EquipmentTypeEnum.EssentialEquipmentsEnum,
        EquipmentTypeEnum.ExceptionalServices,
        EquipmentTypeEnum.SecurityEquipement,
      ],
    },
  });
  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  const selectedEquipements: string[] = [];

  const saveEquipements = (equipement: string) => {
 
    selectedEquipements.push(equipement);
  };

  return (
    <VStack>
      <Box
        margin={"auto"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
      >
        <Heading p={10} textAlign={"left"}>
          Indiquez aux voyageurs quels sont les équipements de votre logement{" "}
        </Heading>
        <SimpleGrid
          p={20}
          spacing={4}
          templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        >
          {data?.equipmentValues
            ? data.equipmentValues.map((equipment: string) => (
                <Card
                  key={equipment}
                  cursor="pointer"
                  onClick={() => saveEquipements(equipment)}
                >
                  <CardHeader>
                    <Heading size="sm">{equipment}</Heading>
                  </CardHeader>
                </Card>
              ))
            : null}
        </SimpleGrid>
      </Box>
    </VStack>
  );
}
