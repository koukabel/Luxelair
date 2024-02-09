import { Heading, VStack, Text, Image, Input } from "@chakra-ui/react";
import { IoLocationSharp } from "react-icons/io5";

interface props {
    location: string
}
 const Location: React.FC<props> = ({ location }) =>  {
    return (
        <VStack p={"10"}>
            <Heading>Où est situé votre logement ?</Heading>
        <Text>Votre adresse est uniquement communiquée aux voyageurs une fois leur réservation effectuée. </Text>
        <Input  w="40vw"
          pos="absolute"
          top="30%"
          left="50%"
        value={location}
          bg={"white"}
          transform="translate(-50%,-50%)"
          placeholder="Saisissez votre adresse" 
          borderRadius={"10"}/> 
           {/* <IoLocationSharp  />  */}     
        <Image src="map.png" alt="map" /> 
        </VStack>
    )
}

export default Location; 