import { HousingTypeEnum } from "@/gql/graphql";
import { gql, useQuery } from "@apollo/client";
import { Box, Card, CardBody, CardHeader, Heading, SimpleGrid, VStack } from "@chakra-ui/react";
import { FaHouse } from "react-icons/fa6";
import { useState } from "react";

interface HouseTypeProps {
  onSelectedTypeChange: (housingType: HousingTypeEnum) => void;
}

const HouseType: React.FC<HouseTypeProps> = ({ onSelectedTypeChange }) => {
  const GET_HOUSE_TYPES = gql`
    query GetHousingTypes {
      getHousingTypes
    }
  `;

  const { data } = useQuery(GET_HOUSE_TYPES);
  const [selectedType, setSelectedType] = useState<HousingTypeEnum | null>(null);

  const saveHousingType = (type: HousingTypeEnum) => {
    setSelectedType(type);
    onSelectedTypeChange(type);
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
          Parmi les propositions suivantes, laquelle décrit le mieux votre logement ?
        </Heading>
        <SimpleGrid
          p={20}
          spacing={4}
          templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        >
          {data?.getHousingTypes
            ? data.getHousingTypes.map((type: HousingTypeEnum) => (
                <Card
                  key={type}
                  cursor="pointer"
                  onClick={() => saveHousingType(type)}
                  bg={selectedType === type ? "lightGray" : "white"} 
                >
                  <CardHeader>
                    <FaHouse />
                  </CardHeader>
                  <CardBody>
                    <Heading size="sm">{type}</Heading>
                  </CardBody>
                </Card>
              ))
            : null}
        </SimpleGrid>
      </Box>
    </VStack>
  );
};

export default HouseType;
