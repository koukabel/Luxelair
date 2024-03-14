import { Button, Heading, VStack } from "@chakra-ui/react";


interface Props {
  onSubmit: () => void;
}
const FinalStep: React.FC<Props> = ({ onSubmit }) => {
  const handleClick = () => {
    onSubmit();
    console.log('sub')
  };
  return (
    <VStack height={'40vh'}> 
    <Heading p={10} textAlign={"left"}>
          Félicitations
      </Heading><Button onClick={handleClick}>Publier mon annonce</Button>
      </VStack> 
  );
};

export default FinalStep;
