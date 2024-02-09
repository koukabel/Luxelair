// import {
//     FormControl,
//     FormLabel,
//     Input,
//     Textarea,
//     Button,
//     Box,
//   } from "@chakra-ui/react";
//   import { useState } from "react";
//   import { gql, useMutation } from "@apollo/client";
//   import { CreateAdMutation, CreateAdMutationVariables } from "@/gql/graphql";
  
//   const CREATE_AD = gql`
//     mutation CreateAd(
//       $title: String!
//       $location: String!
//       $price: Float!
//       $description: String
//     ) {
//       createAd(
//         title: $title
//         location: $location
//         price: $price
//         description: $description
//       ) {
//         id
//         title
//         location
//         price
//         description
//       }
//     }
//   `;
  
//   export default function CreateAdComponent() {
//     const [fileAd, setFileAd] = useState<File | null>(null);
//     const [publishAdInfo, setPublishAdInfo] = useState<CreateAdMutationVariables>(
//       {
//         title: "",
//         description: "",
//         location: "",
//         price: 0,
//       }
//     );
  
//     function handleChange(e: any) {
//       const { name, value } = e.target;
//       //convert string to number (price)
//       const newValue = name === "price" ? parseFloat(value) : value;
//       setPublishAdInfo((prevState) => ({
//         ...prevState,
//         [name]: newValue,
//       }));
//     }
  
//     const uploadFile = async (id: string) => {
//       if (fileAd) {
//         const body = new FormData();
//         body.append("file", fileAd, `${id}.jpg`);
//         await fetch("/file-hosting", {
//           method: "POST",
//           body,
//         });
//       }
//     };
  
//     const [createAd] = useMutation<CreateAdMutation, CreateAdMutationVariables>(
//       CREATE_AD
//     );
  
//     const createNewAd = async () => {
//       try {
//         const { data } = await createAd({
//           variables: {
//             title: publishAdInfo.title,
//             description: publishAdInfo.description,
//             location: publishAdInfo.location,
//             price: publishAdInfo.price,
//           },
//         });
//         if (data) {
//           const { id } = data.createAd;
//           await uploadFile(id);
//         }
//       } catch (error) {}
//     };
  
//     return (
//       <form style={{ margin: "auto", marginTop: "5rem", width: "50%" }}>
//         <FormControl m={2} isRequired>
//           <FormLabel>Donner un titre à mon annonce</FormLabel>
//           <Input type="text" name="title" onChange={handleChange} />
//         </FormControl>
//         <FormLabel m={2}>Description de mon logement</FormLabel>
//         <Textarea
//           m={2}
//           placeholder="Description de mon annonce"
//           name="description"
//           onChange={handleChange}
//         />
//         <FormControl m={2} isRequired>
//           <Box
//             position="relative"
//             overflow="hidden"
//             borderWidth="2px"
//             borderColor="gray.200"
//             borderRadius="md"
//           >
//             <Button
//               as="label"
//               htmlFor="fileUpload"
//               borderWidth="2px"
//               borderColor="gray.200"
//               borderRadius="md"
//               bg="white"
//               color="gray.700"
//               py={2}
//               px={4}
//               _hover={{
//                 bg: "gray.100",
//                 color: "gray.900",
//               }}
//               _focus={{
//                 outline: "none",
//                 boxShadow: "outline",
//               }}
//             >
//               {fileAd ? fileAd.name : "Choisir un fichier"}
//             </Button>
//             <Input
//               type="file"
//               name="file"
//               id="fileUpload"
//               onChange={(event) => {
//                 const { files } = event.target;
//                 if (files) {
//                   console.log(files[0]);
//                   setFileAd(files[0]);
//                 }
//               }}
//               position="absolute"
//               opacity={0}
//               zIndex={-1}
//             />
//           </Box>
//           <FormLabel>L'adresse du bien</FormLabel>
//           <Input type="text" name="location" onChange={handleChange} />
//         </FormControl>
//         <FormLabel m={2}>A présent, fixez le prix d'une nuit</FormLabel>
//         <Input type="number" m={2} name="price" onChange={handleChange} />
//         <Button
//           m={2}
//           variant="solid"
//           bg="#B4770A"
//           color="white"
//           _hover={{ bg: "#000000" }}
//           onClick={createNewAd}
//         >
//           Mettre mon annonce en ligne
//         </Button>
//       </form>
//     );
//   }