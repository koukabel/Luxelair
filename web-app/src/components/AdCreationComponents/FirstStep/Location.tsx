import React from "react";
import { Heading, VStack, Text, Image, Input, Button } from "@chakra-ui/react";

interface LocationProps {
  onLocationChange: (newLocation: string) => void;
}

const Location: React.FC<LocationProps> = ({ onLocationChange }) => {
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onLocationChange(e.target.value);
  };

  return (
    <VStack p={"10"}>
      <Heading>Où est situé votre logement ?</Heading>
      <Text fontSize='md' textAlign={'center'} color={'gray'} p={'10px'}>
        Votre adresse est uniquement communiquée aux voyageurs une fois leur
        réservation effectuée.{" "}
      </Text>
      <Input
        w="40vw"
        type="text"
        pos="absolute"
        top="30%"
        left="50%"
        bg={"white"}
        transform="translate(-50%,-50%)"
        placeholder="Saisissez votre adresse"
        borderRadius={"10"}
        onChange={handleLocationChange}
      />
    
    </VStack>
  );
};

export default Location;
