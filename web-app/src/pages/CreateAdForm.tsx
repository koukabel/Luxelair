import { ChakraProvider } from "@chakra-ui/react";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { gql, useMutation } from "@apollo/client";
import FirstStep from "@/components/adCreationComponents/FirstStep/FirstStep";
import ControlButtons from "@/components/adCreationComponents/FirstStep/ControlButtons";
import { useState } from "react";
import Equipements from "@/components/adCreationComponents/SecondStep/Equipements";
import HouseType from "@/components/adCreationComponents/FirstStep/HouseType";
import SecondStep from "@/components/adCreationComponents/SecondStep/SecondStep";
import Location from "@/components/adCreationComponents/FirstStep/Location";
import UploadAdImage from "@/components/adCreationComponents/SecondStep/UploadAdImage";
import AdditionalInformation from "@/components/adCreationComponents/FirstStep/AdditionalInformation";
import { MutationCreateAdArgs } from "@/gql/graphql";

export default function CreateAdForm() {
  const [currentComponent, setCurrentComponent] = useState(1);
  const [progressValue, setProgressValue] = useState(10);
  const [publishAdInfo, setPublishAdInfo] = useState<MutationCreateAdArgs>(
    {
      title: "",
      description: "",
      location: "",
      price: 0,
    }
  );

  const handleNext = () => {
    setProgressValue((prevProgress) => prevProgress + 10);
    setCurrentComponent((currentComponent) => currentComponent + 1);
  };

  const handlePrevious = () => {
    setProgressValue((prevProgress) => prevProgress - 10);
    setCurrentComponent((currentComponent) => currentComponent - 1);
  };

  //const CREATE_AD = gql`
  //     mutation Mutation($title: String!, $location: String!, $price: Float!, $description: String, $type: HousingTypeEnum, $equipments: [EquipmentTypeEnum!], $selectedEquipmentValues: [EquipmentValueInput!]) {
  //createAd(title: $title, location: $location, price: $price, description: $description, type: $type, equipments: $equipments, selectedEquipmentValues: $selectedEquipmentValues) {
  //   title
  // price
  //location
  //description
  // }
  //}
  //   `;

  console.log(publishAdInfo.location)

  return (
    <ChakraProvider>
      <Navbar />
      {currentComponent === 1 && <FirstStep />}
      {currentComponent === 2 && <Equipements />}
      {currentComponent === 3 && <HouseType />}
      {currentComponent === 4 && <SecondStep />}
      {currentComponent === 5 && <UploadAdImage />}
      {currentComponent === 6 && <AdditionalInformation />}
      {currentComponent === 7 && <Location location={publishAdInfo.location}  />}
      <ControlButtons
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        progressValue={progressValue}
      />

      <Footer />
    </ChakraProvider>
  );
}
