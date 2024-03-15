import { Button, Flex, Progress } from "@chakra-ui/react";
import { useState } from "react";


interface ControlButtonsProps {
  handleNext: () => void;
  handlePrevious: () => void;
  progressValue: number;
}


const ControlButtons: React.FC<ControlButtonsProps> = ({ handleNext, handlePrevious, progressValue }) => {
  return (
    <div>
      <Progress colorScheme="yellow" size="sm" value={progressValue} />
      <Flex justifyContent="space-between" p={10}>
        <Button onClick={handlePrevious} bg="black" color="white">Retour</Button>
        <Button onClick={handleNext} bg="black" color="white">Suivant</Button>
      </Flex>
    </div>
  );
};

export default ControlButtons;
