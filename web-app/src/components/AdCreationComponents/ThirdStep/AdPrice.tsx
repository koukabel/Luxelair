import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Text,
  Heading,
  IconButton,
  Input,
  VStack,
  useEditableControls,
} from "@chakra-ui/react";
import { useState } from "react";

interface Props {
  value: number;
  onChange: (newValue: number) => void;
}

const AdPrice: React.FC<Props> = ({ value, onChange }) => {
  const [price, setPrice] = useState(value);

  function handlePriceChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = parseFloat(e.target.value);
    setPrice(newValue);
    onChange(newValue);
  }
  
  function EditableControls() {
    const { isEditing, getSubmitButtonProps, getCancelButtonProps, getEditButtonProps } = useEditableControls();
    return isEditing ? (
      <ButtonGroup justifyContent='center' size='sm'>
        <IconButton aria-label="" icon={<CheckIcon />}  {...getSubmitButtonProps()} />
        <IconButton aria-label="" icon={<CloseIcon />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <Flex justifyContent='center'>
        <IconButton aria-label="" size='sm' icon={<EditIcon />} {...getEditButtonProps()} />
      </Flex>
    );
  }

  return (

      <Box   p="2em"
      display={'flex'}
      flexDirection={'column'}
      gap="1em"
      justifyContent={'center'}>
        <Heading  fontSize="x-large" textAlign={"center"}>
          À présent, fixez votre prix
        </Heading>

        <Text fontSize='md' textAlign={'center'} color={"gray"}>Vous pouvez le modifier à tout moment.</Text>
        <Editable
          textAlign="center"
          defaultValue={price.toString()}
          fontSize="6xl"
          isPreviewFocusable={false}
            p="10px"
        
        >
          <EditablePreview />
          <Input
            as={EditableInput}
            width={"30vw"}
            value={price}
            onChange={handlePriceChange} 
            p="10px"
          />
           € 
          <EditableControls />
        </Editable>
      </Box>
  
  );
};

export default AdPrice;
