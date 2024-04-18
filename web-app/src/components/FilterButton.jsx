import { LuSettings2 } from "react-icons/lu";
import{ Button, Flex, IconButton} from "@chakra-ui/react";
const FilterButton = () => {
  return (
    <Flex>
    <IconButton
      colorScheme="gray"
      aria-label="Filtres"
     
      icon={ <LuSettings2 />}
      pl='10px'
    />
   </Flex>
  );
};

export default FilterButton;
