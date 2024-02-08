import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
<<<<<<< HEAD
  Stack,
  Radio,
} from "@chakra-ui/react";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import {
  CreateAdMutation,
  CreateAdMutationVariables,
  EquipmentTypeEnum,
  EquipmentValueInput,
  HousingTypeEnum,
} from "@/gql/graphql";
=======
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { CreateAdMutation, CreateAdMutationVariables } from "@/gql/graphql";
>>>>>>> dev

const CREATE_AD = gql`
  mutation CreateAd(
    $title: String!
    $location: String!
    $price: Float!
    $description: String
<<<<<<< HEAD
    $type: HousingTypeEnum
    $equipments: [EquipmentTypeEnum!]
    $selectedEquipmentValues: [EquipmentValueInput!]
=======
>>>>>>> dev
  ) {
    createAd(
      title: $title
      location: $location
      price: $price
      description: $description
<<<<<<< HEAD
      type: $type
      equipments: $equipments
      selectedEquipmentValues: $selectedEquipmentValues
    ) {
=======
    ) {
      id
>>>>>>> dev
      title
      price
      location
      description
    }
  }
`;

export default function CreateAdComponent() {
<<<<<<< HEAD
=======
  const [fileAd, setFileAd] = useState<File | null>(null);
>>>>>>> dev
  const [publishAdInfo, setPublishAdInfo] = useState<CreateAdMutationVariables>(
    {
      title: "",
      description: "",
      location: "",
      price: 0,
<<<<<<< HEAD
      equipments: EquipmentTypeEnum.ExceptionalServices,
      selectedEquipmentValues: [{ equipmentType: EquipmentTypeEnum.ExceptionalServices, selectedValues: [] }],
      type: undefined,
=======
>>>>>>> dev
    }
  );

  function handleChange(e: any) {
    const { name, value } = e.target;
    //convert string to number (price)
    const newValue = name === "price" ? parseFloat(value) : value;
    setPublishAdInfo((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  }

<<<<<<< HEAD
  const [createAd] = useMutation<CreateAdMutation, CreateAdMutationVariables>(
    CREATE_AD
  );

=======
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

  const [createAd] = useMutation<CreateAdMutation, CreateAdMutationVariables>(
    CREATE_AD
  );

>>>>>>> dev
  const createNewAd = async () => {
    try {
      const { data } = await createAd({
        variables: {
          title: publishAdInfo.title,
          description: publishAdInfo.description,
          location: publishAdInfo.location,
          price: publishAdInfo.price,
<<<<<<< HEAD
          equipments: publishAdInfo.equipments,
          selectedEquipmentValues: [{ equipmentType: EquipmentTypeEnum.ExceptionalServices, selectedValues: [] }],
          type: publishAdInfo.type,
        },
      });
    } catch (error) {
      console.log(error);
    }
  
  };


  console.log((publishAdInfo.selectedEquipmentValues as EquipmentValueInput[])[0]?.selectedValues);



=======
        },
      });
      if (data) {
        const { id } = data.createAd;
        await uploadFile(id);
      }
    } catch (error) {}
  };

>>>>>>> dev
  return (
    <form style={{ margin: "auto", marginTop: "5rem", width: "50%" }}>
      <FormControl m={2} isRequired>
        <FormLabel>Donner un titre à mon annonce</FormLabel>
        <Input type="text" name="title" onChange={handleChange} />
      </FormControl>
      <FormLabel m={2}>Description de mon logement</FormLabel>
      <Textarea
        m={2}
        placeholder="Description de mon annonce"
        name="description"
        onChange={handleChange}
      />
      <FormControl m={2} isRequired>
<<<<<<< HEAD
=======
        <Box
          position="relative"
          overflow="hidden"
          borderWidth="2px"
          borderColor="gray.200"
          borderRadius="md"
        >
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
            {fileAd ? fileAd.name : "Choisir un fichier"}
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
        </Box>
>>>>>>> dev
        <FormLabel>L'adresse du bien</FormLabel>
        <Input type="text" name="location" onChange={handleChange} />
      </FormControl>
      <FormLabel m={2}>A présent, fixez le prix d'une nuit</FormLabel>
<<<<<<< HEAD

      <Input type="number" m={2} name="price" onChange={handleChange} />

      <FormLabel m={2}>Equipements</FormLabel>
      <Stack direction="row">
        {Object.values(EquipmentTypeEnum).map((equipement, index) => (
          <Radio key={index} value={equipement}>
            {equipement}  
          </Radio>
      
        ))}
      </Stack>
      <FormLabel m={2}>Type de logement</FormLabel>
      <Stack direction="row">
        {Object.values(HousingTypeEnum).map((housingType, index) => (
          <Radio key={index} value={housingType}>
            {housingType}
          </Radio>
        ))}
      </Stack>
=======
      <Input type="number" m={2} name="price" onChange={handleChange} />
>>>>>>> dev
      <Button
        m={2}
        variant="solid"
        bg="#B4770A"
        color="white"
        _hover={{ bg: "#000000" }}
        onClick={createNewAd}
      >
        Mettre mon annonce en ligne
      </Button>
    </form>
  );
}
