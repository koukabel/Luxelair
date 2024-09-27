import { Box, Heading, Textarea, VStack, Text } from '@chakra-ui/react';
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

      <Box
      p="2em"
        display={'flex'}
        flexDirection={'column'}
        gap="1em"
        justifyContent={'center'}
      >
        <Heading fontSize="x-large" textAlign={"center"}>
          À présent, donnez un titre à votre annonce
        </Heading>
        <Text fontSize='md' textAlign={'center'} color={'gray'} p={'10px'}>
          Les titres courts sont généralement les plus efficaces. Ne vous
          inquiétez pas, vous pourrez toujours le modifier plus tard.
        </Text>
        <Textarea
          value={title} 
          onChange={handleInputChange} 
          size='sm'
          p="10px"
        />
      </Box>

  );
};

export default AdTitle;
