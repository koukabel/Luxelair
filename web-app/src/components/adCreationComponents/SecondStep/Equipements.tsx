import { gql, useQuery } from "@apollo/client";

import {
  Card,
  CardHeader,
  Heading,
  SimpleGrid,
  Box,
  VStack
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface props {
  onSelectedEquipmentChange: (selectedValues: string[]) => void;
}

const GET_EQUIPEMENTS = gql`
  query getEquipments($equipmentTypes: [EquipmentTypeEnum!]!) {
    getEquipmentsList(equipmentTypes: $equipmentTypes)
  }
`;


const Equipements: React.FC<props> = ({ onSelectedEquipmentChange}) =>  {
  const { loading, error, data } = useQuery(GET_EQUIPEMENTS, {
    variables: {
      equipmentTypes: [
        "EssentialEquipmentsEnum",
        "ExceptionalServices",
        "SecurityEquipement",
      ],
    },
  });
  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  const [selectedEquipmentValues, setSelectedEquipmentValues] = useState<string[]>([]);
  

    function saveEquipementsList (equipment: string){
      setSelectedEquipmentValues(prevValues => [...prevValues, equipment]);
      onSelectedEquipmentChange([...selectedEquipmentValues, equipment]);
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
          {data?.getEquipmentsList?
            data.getEquipmentsList
            .map((equipment: string) => (
                <Card
                  key={equipment}
                  cursor="pointer"
                  onClick={() => saveEquipementsList(equipment)}
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


export default Equipements; 