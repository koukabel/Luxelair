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

interface Props {
  onSelectedEquipmentChange: (selectedValues: string[]) => void;
}

const GET_EQUIPEMENTS = gql`
query getEquipements {
  getEquipmentTypes
}
`;

const Equipements: React.FC<Props> = ({ onSelectedEquipmentChange }) => {
  const { loading, error, data } = useQuery(GET_EQUIPEMENTS);

  const [selectedEquipmentValues, setSelectedEquipmentValues] = useState<string[]>([]);
  const [selectedCards, setSelectedCards] = useState<Set<string>>(new Set());

  function saveEquipementsList(equipment: string) {
    setSelectedEquipmentValues(prevValues => [...prevValues, equipment]);
    onSelectedEquipmentChange([...selectedEquipmentValues, equipment]);
    setSelectedCards(prevSelectedCards => new Set(prevSelectedCards).add(equipment));
  }
  return (
    <Box >
      <Heading fontSize="x-large" textAlign={"center"}>
        Indiquez aux voyageurs quels sont les équipements de votre logement
      </Heading>
      <SimpleGrid
        w="100%" padding="10" minChildWidth="150px" spacing="50px"
      >
        {data?.getEquipmentTypes && data.getEquipmentTypes.map((equipment: string) => (
          <Card
            key={equipment}
            cursor="pointer"
            onClick={() => saveEquipementsList(equipment)}
            bg={selectedCards.has(equipment) ? "lightGray" : "white"}
          >
            <CardHeader>
              <Heading size="sm">{equipment}</Heading>
            </CardHeader>
          </Card>
        ))}
      </SimpleGrid>

    </Box>
  );
}

export default Equipements;
