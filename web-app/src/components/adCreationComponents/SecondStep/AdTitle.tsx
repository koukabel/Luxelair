import { Box, Heading, Textarea, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

interface Props {
  value: string;
  onChange: (newValue: string) => void; 
}

const AdTitle: React.FC<Props> = ({ value, onChange }) => {
  const [title, setTitle] = useState(value);

  function handleInputChange(e: React.ChangeEvent<HTMLTextAreaElement>): void {
    const newValue = e.target.value;
    setTitle(newValue);
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
          À présent, donnez un titre à votre annonce
        </Heading>
        <p>
          Les titres courts sont généralement les plus efficaces. Ne vous
          inquiétez pas, vous pourrez toujours le modifier plus tard.
        </p>
        <Textarea
          value={title} 
          onChange={handleInputChange} 
          size='sm'
        />
      </Box>
    </VStack>
  );
};

export default AdTitle;
