import { Box, Heading, Textarea, VStack, Text } from '@chakra-ui/react';
import { useState } from 'react';

interface Props {
  value: string;
  onChange: (newValue: string) => void; 
}

const AdDecription: React.FC<Props> = ({ value, onChange }) => {
  const [decription, setDecription] = useState(value);

  function handleInputChange(e: React.ChangeEvent<HTMLTextAreaElement>): void {
    const newValue = e.target.value;
    setDecription(newValue);
    onChange(e.target.value); 
  }
  
  return (
    <VStack height={'41vh'}>
      <Box
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
      >
        <Heading p={10} textAlign={'left'}>
        Créez votre description

        </Heading>
        <Text fontSize='md' textAlign={'center'} color={"gray"}>Racontez ce qui rend votre logement unique.</Text>
        <Textarea
          value={decription} 
          onChange={handleInputChange} 
          size='xl'
        />
      </Box>
    </VStack>
  );
};

export default AdDecription;
