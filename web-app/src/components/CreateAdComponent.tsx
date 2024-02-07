import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
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

const CREATE_AD = gql`
  mutation CreateAd(
    $title: String!
    $location: String!
    $price: Float!
    $description: String
    $type: HousingTypeEnum
    $equipments: [EquipmentTypeEnum!]
    $selectedEquipmentValues: [EquipmentValueInput!]
  ) {
    createAd(
      title: $title
      location: $location
      price: $price
      description: $description
      type: $type
      equipments: $equipments
      selectedEquipmentValues: $selectedEquipmentValues
    ) {
      title
      price
      location
      description
    }
  }
`;

export default function CreateAdComponent() {
  const [publishAdInfo, setPublishAdInfo] = useState<CreateAdMutationVariables>(
    {
      title: "",
      description: "",
      location: "",
      price: 0,
      equipments: EquipmentTypeEnum.ExceptionalServices,
      selectedEquipmentValues: [{ equipmentType: EquipmentTypeEnum.ExceptionalServices, selectedValues: [] }],
      type: undefined,
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

  const [createAd] = useMutation<CreateAdMutation, CreateAdMutationVariables>(
    CREATE_AD
  );

  const createNewAd = async () => {
    try {
      const { data } = await createAd({
        variables: {
          title: publishAdInfo.title,
          description: publishAdInfo.description,
          location: publishAdInfo.location,
          price: publishAdInfo.price,
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
        <FormLabel>L'adresse du bien</FormLabel>
        <Input type="text" name="location" onChange={handleChange} />
      </FormControl>
      <FormLabel m={2}>A présent, fixez le prix d'une nuit</FormLabel>

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
