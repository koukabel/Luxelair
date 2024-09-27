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

    <Box
      p="2em"
    >
      <Heading fontSize="x-large" textAlign={"center"}>
        Parmi les propositions suivantes, laquelle décrit le mieux votre logement ?
      </Heading>
      <SimpleGrid
        w="100%" padding="10" minChildWidth="150px" spacing="50px"
      >
        {data?.getHousingTypes
          ? data.getHousingTypes.map((type: HousingTypeEnum) => (
            <Card
              key={type}
              cursor="pointer"
              onClick={() => saveHousingType(type)}
              bg={selectedType === type ? "lightGray" : "white"}
            >

              <CardBody>
                <Heading textAlign="center" size="sm">{type}</Heading>
              </CardBody>
            </Card>
          ))
          : null}
      </SimpleGrid>
    </Box>

  );
};

export default HouseType;
