import { LuSettings2 } from "react-icons/lu";
import{ Button, Flex, IconButton, HStack, Box, AbsoluteCenter, Text, VStack} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import { FaHouse } from "react-icons/fa6";
import { FilterTypeQuery, HousingTypeEnum } from "@/gql/graphql";
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


const FILTER_BY_HOUSETYPE = gql`
query filterType($type: String!) {
  filterByHouseType(type: $type) {
    housingType
    id
  }
}`;


const { data } = useQuery(GET_HOUSE_TYPES);
const [filteredAds] = useLazyQuery<FilterTypeQuery>(FILTER_BY_HOUSETYPE);

const router = useRouter(); 
const [selectedType, setSelectedType] = useState<HousingTypeEnum | null>(null); 

const searchByHouseType = (type: HousingTypeEnum) => {
  setSelectedType(type);
  filteredAds({ variables: { type } }); 
  router.push(`/search-results-by-type?type=${type}`);
};

const getIconForType = (type: HousingTypeEnum) => {
  switch (type) {
    case HousingTypeEnum.Chalet:
      return <TbBuildingCottage />;
    case HousingTypeEnum.Appartement:
      return <BsBuildings />;
    case HousingTypeEnum.HotelParticulier:
      return <LuHotel />;
    case HousingTypeEnum.Maison:
      return <BsHouseDoor />;
    case HousingTypeEnum.Chateau:
      return <MdOutlineCastle />;
    case HousingTypeEnum.Bateau:
      return <MdOutlineDirectionsBoatFilled />;
    case HousingTypeEnum.Tour:
      return <PiCastleTurret />;
    case HousingTypeEnum.LogementSurLEau:
      return <MdOutlineHouseboat />;
    default:
      return <FaHouse />;
  }
};


return (

  <HStack spacing='24px' h="10vh" m='5px' justifyContent='center' pos='sticky' top="0" zIndex= "1000" bg="white" > 
  <Flex alignItems='center'>
  {data?.getHousingTypes && data.getHousingTypes.map((type: HousingTypeEnum, index: number) => (
          <VStack pr='50px'>
            <Box onClick={() => searchByHouseType(type)}  key={index} cursor="pointer" color={selectedType === type ? "black" : "gray"}  display="contents"> 
              {getIconForType(type)}
              <Text fontSize='xs' textAlign="center">{type}</Text> 
            </Box>
          </VStack>
        ))}
 
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
function filteredAds(arg0: { variables: { type: HousingTypeEnum; }; }) {
  throw new Error("Function not implemented.");
}

