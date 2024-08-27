import { Button, Flex, Progress } from "@chakra-ui/react";



interface ControlButtonsProps {
  handleNext: () => void;
  handlePrevious: () => void;
  progressValue: number;
  hidePreviousButton: boolean;
  hideNextButton: boolean
  handleSubmit: () => void;
  isPublicationButtonShown: boolean
}


const ControlButtons: React.FC<ControlButtonsProps> = ({ handleNext, handlePrevious, progressValue, hidePreviousButton, hideNextButton, handleSubmit, isPublicationButtonShown  }) => {
  return (
    <div>
      <Progress colorScheme="yellow" size="sm" value={progressValue} />
      <Flex justifyContent="space-between" p={10}>
      {!hidePreviousButton && <Button bg="black" color="white" onClick={handlePrevious}>Retour</Button>}
      {!hideNextButton && <Button bg="black" color="white" onClick={handleNext}>Suivant</Button>}
      {isPublicationButtonShown && <Button bg="black" color="white"  onClick={handleSubmit}>Publier mon annonce</Button>}
      </Flex>
    </div>
  );
};

export default ControlButtons;
