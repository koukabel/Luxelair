import { Box, Heading, VStack, Text, Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import { BsCloudUpload } from "react-icons/bs";
export default function UploadAdImage() {
    const [fileAd, setFileAd] = useState<File | null>(null);
    const uploadFile = async (id: string) => {
              if (fileAd) {
                const body = new FormData();
                body.append("file", fileAd, `${id}.jpg`);
                await fetch("/file-hosting", {
                  method: "POST",
                  body,
                });
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
              {fileAd ? fileAd.name : " Télécharger depuis votre appareil"}
            </Button>
            <Input
              type="file"
              name="file"
              id="fileUpload"
              onChange={(event) => {
                const { files } = event.target;
                if (files) {
                  console.log(files[0]);
                  setFileAd(files[0]);
                }
              }}
              position="absolute"
              opacity={0}
              zIndex={-1}
            />
        </VStack>
      </Box>
    </VStack>
  );
}
