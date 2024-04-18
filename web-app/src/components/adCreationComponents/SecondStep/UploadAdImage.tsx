import { Box, Button, Heading, Input, VStack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { BsCloudUpload } from "react-icons/bs";

interface ImageUploaderProps {
  onFileSelect: (file: File | null) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onFileSelect }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      setFile(selectedFile);
      onFileSelect(selectedFile);
    }
  };

          
  return (
    <VStack>
      <Heading>Ajoutez quelques photos de votre maison</Heading>
      <Box
        margin={"10"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        h={"40vh"}
        w={"40vw"}
       bg={"lightgray"}
       
        border={"dashed"}
        borderColor={"gray"}
      >
        <VStack flexDirection={"column"}>  
        <BsCloudUpload />
         <Heading as='h5' size='sm'> Faites glisser vos photos ici</Heading>
        <Text>Choisissez au moins une photo</Text>

        <Button
              as="label"
              htmlFor="fileUpload"
              borderWidth="2px"
              borderColor="gray.200"
              borderRadius="md"
              bg="white"
              color="gray.700"
              py={2}
              px={4}
              _hover={{
                bg: "gray.100",
                color: "gray.900",
              }}
              _focus={{
                outline: "none",
                boxShadow: "outline",
              }}
            >
             {file ? file.name : " Télécharger depuis votre appareil"} 
            </Button>
            <Input
              type="file"
              name="file"
              id="fileUpload"   
              onChange={handleFileSelect}
              position="absolute"
              opacity={0}
              zIndex={-1}
            />
          
        </VStack>
      </Box>
    </VStack>
  );
}

export default ImageUploader;







