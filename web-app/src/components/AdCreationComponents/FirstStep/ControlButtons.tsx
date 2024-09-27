// import { Button, Flex, Progress, Container } from "@chakra-ui/react";
// import { off } from "process";

// interface ControlButtonsProps {
//   handleNext: () => void;
//   handlePrevious: () => void;
//   progressValue: number;
//   hidePreviousButton: boolean;
//   hideNextButton: boolean; 
//   handleSubmit: () => void;
//   isPublicationButtonShown: boolean
// }


// const ControlButtons: React.FC<ControlButtonsProps> = ({ handleNext, handlePrevious, progressValue, hidePreviousButton, hideNextButton, handleSubmit, isPublicationButtonShown }) => {
  
//   if(hidePreviousButton === true){
// console.log("hidden" )
//   }else {
//     console.log("false")
//   }
//   return (
//     <div className="controlBtns">
//       <Progress colorScheme="yellow" size="sm" value={progressValue} />
//       <Flex justifyContent="space-between" p={10}>
//         {!hidePreviousButton && <Button bg="black" color="white" onClick={handlePrevious}>Retour</Button>}
     
//         {!hideNextButton && <Button bg="black" color="white" onClick={handleNext}>Suivant</Button>}
//         {isPublicationButtonShown && <Button bg="black" color="white" onClick={handleSubmit}>Publier mon annonce</Button>}
//       </Flex>
//     </div>
//   );
// };

// export default ControlButtons;
import { Button, Flex, Progress } from "@chakra-ui/react";

interface ControlButtonsProps {
  handleNext: () => void;
  handlePrevious: () => void;
  progressValue: number;
  hidePreviousButton: boolean;
  hideNextButton: boolean; 
  handleSubmit: () => void;
  isPublicationButtonShown: boolean;
}

const ControlButtons: React.FC<ControlButtonsProps> = ({ 
  handleNext, 
  handlePrevious, 
  progressValue, 
  hidePreviousButton, 
  hideNextButton, 
  handleSubmit, 
  isPublicationButtonShown 
}) => {

  return (
    <div className="controlBtns">
      <Progress colorScheme="yellow" size="sm" value={progressValue} />
      <Flex justifyContent="space-between" p={10}>
        <Button 
          bg="black" 
          color="white" 
          onClick={handlePrevious} 
          visibility={hidePreviousButton ? "hidden" : "visible"}
        >
          Retour
        </Button>

        {!hideNextButton && (
          <Button bg="black" color="white" onClick={handleNext}>
            Suivant
          </Button>
        )}


        {isPublicationButtonShown && (
          <Button bg="black" color="white" onClick={handleSubmit}>
            Publier mon annonce
          </Button>
        )}
      </Flex>
    </div>
  );
};

export default ControlButtons;
