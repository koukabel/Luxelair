import { LuSettings2 } from "react-icons/lu";
import{ Button, Flex, IconButton, HStack, Box, AbsoluteCenter, Text} from "@chakra-ui/react";
import { gql, useQuery } from "@apollo/client";
import { FaHouse } from "react-icons/fa6";
import { HousingTypeEnum } from "@/gql/graphql";
import { TbBuildingCottage } from "react-icons/tb";
import { BsBuildings } from "react-icons/bs";
import { LuHotel } from "react-icons/lu";
import { BsHouseDoor } from "react-icons/bs";
import { PiCastleTurret } from "react-icons/pi";
import { MdOutlineDirectionsBoatFilled } from "react-icons/md";
import { MdOutlineHouseboat } from "react-icons/md";
import { MdOutlineCastle } from "react-icons/md";
const FilterSection = () => {
  const GET_HOUSE_TYPES = gql`
  query GetHousingTypes {
    getHousingTypes
  }
`;

const { data } = useQuery(GET_HOUSE_TYPES);

const iconMap: Record<HousingTypeEnum, React.ReactNode> = {
  [HousingTypeEnum.Chalet]: <TbBuildingCottage />, 
  [HousingTypeEnum.Appartement]: <BsBuildings/>, 
  [HousingTypeEnum.HotelParticulier]: <LuHotel/>, 
   [HousingTypeEnum.Maison]: <BsHouseDoor/>
   [HousingTypeEnum.Chateau]: <MdOutlineCastle/>
  // [HousingTypeEnum.Bateau]: <MdOutlineDirectionsBoatFilled/>
  // [HousingTypeEnum.Tour]: <PiCastleTurret/>
  // [HousingTypeEnum.Logement_sur_l_eau]:  <MdOutlineHouseboat/>

};


return (
  <HStack spacing='24px' w="100%" h="10vh">
    {data?.getHousingTypes && data.getHousingTypes.map((type) => (
      <Box w='100px' h='8vh'  key={type} cursor="pointer">

        <FaHouse/>
        <Text fontSize='xs' textAlign="center">{type} </Text> 
      </Box>
    ))}
    <Flex>
      <IconButton
        colorScheme="gray"
        aria-label="Filtres"
        icon={<LuSettings2 />}
        pl='10px'
      />
    </Flex>
  </HStack>
);

};

export default FilterSection;
