import { ChakraProvider } from "@chakra-ui/react";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FirstStep from "@/components/adCreationComponents/FirstStep/FirstStep";
import ControlButtons from "@/components/adCreationComponents/FirstStep/ControlButtons";
import { useState } from "react";
import Equipements from "@/components/adCreationComponents/SecondStep/Equipements";
import HouseType from "@/components/adCreationComponents/FirstStep/HouseType";
import SecondStep from "@/components/adCreationComponents/SecondStep/SecondStep";
import Location from "@/components/adCreationComponents/FirstStep/Location";
import UploadAdImage from "@/components/adCreationComponents/SecondStep/UploadAdImage";
import AdTitle from "@/components/adCreationComponents/SecondStep/AdTitle";
import AdDescription from "@/components/adCreationComponents/SecondStep/AdDescription";
import ThirdStep from "@/components/adCreationComponents/ThirdStep/ThirdStep";
import {
  CreateAdMutation,
  CreateAdMutationVariables,
  MutationCreateAdArgs,
} from "@/gql/graphql";
import AdPrice from "@/components/adCreationComponents/ThirdStep/AdPrice";
import FinalStep from "@/components/adCreationComponents/ThirdStep/FinalStep";
import { gql, useMutation } from "@apollo/client";
import router from "next/router";

export default function CreateAdForm() {
  const [currentComponent, setCurrentComponent] = useState(1);
  const [progressValue, setProgressValue] = useState(10);
  const [publishAdInfo, setPublishAdInfo] = useState<CreateAdMutationVariables>(
    {
      title: "",
      description: "",
      location: "",
      price: 0,
      selectedEquipmentValues: [],
      type: null,
    }
  );

  const handleChange = (fieldName: string, newValue: string | number) => {
    setPublishAdInfo({
      ...publishAdInfo,
      [fieldName]: newValue,
    });
  };

  const handleNext = () => {
    setProgressValue((prevProgress) => prevProgress + 10);
    setCurrentComponent((currentComponent) => currentComponent + 1);
  };

  const handlePrevious = () => {
    setProgressValue((prevProgress) => prevProgress - 10);
    setCurrentComponent((currentComponent) => currentComponent - 1);
  };

  const CREATE_AD = gql`
    mutation CreateAd(
      $title: String!
      $location: String!
      $price: Float!
      $description: String
      $selectedEquipmentValues: [String!]
      $type: HousingTypeEnum
    ) {
      createAd(
        title: $title
        location: $location
        price: $price
        description: $description
        selectedEquipmentValues: $selectedEquipmentValues
        type: $type
      ) {
        description
        location
        price
        selectedEquipmentValues
        title
      }
    }
  `;

  const [createAd] = useMutation<CreateAdMutation, CreateAdMutationVariables>(
    CREATE_AD
  );

  const publishAd = async () => {
    try {
      const { data } = await createAd({
        variables: {
          title: publishAdInfo.title,
          price: publishAdInfo.price as number,
          location: publishAdInfo.location,

          description: publishAdInfo.description,
          selectedEquipmentValues: publishAdInfo.selectedEquipmentValues,
          type: publishAdInfo.type,
        },
      });

      if (data) {
        const { id } = data.createAd;
        // await uploadImage(id);
        console.log("published");
        // router.push(`/articles/${data.createAd.id}?publishConfirmation=true`);
        //}
      }
    } catch (error) {
      console.error("Error publishing ad:", error);
    }
  };

  const handleSubmit = () => {
    //event.preventDefault();
    console.log(publishAdInfo);
    console.log("hi");
    publishAd();
  };

  return (
    <ChakraProvider>
      <Navbar />
      {currentComponent === 1 && <FirstStep />}
      {currentComponent === 2 && (
        <Equipements
          onSelectedEquipmentChange={(selectedValues) =>
            setPublishAdInfo({
              ...publishAdInfo,
              selectedEquipmentValues: selectedValues,
            })
          }
        />
      )}
      {currentComponent === 3 && (
        <HouseType
          onSelectedTypeChange={(housingType) =>
            setPublishAdInfo({
              ...publishAdInfo,
              type: housingType,
            })
          }
        />
      )}

      {currentComponent === 4 && <SecondStep />}
      {currentComponent === 5 && <UploadAdImage image={""} />}
      {currentComponent === 6 && (
        <Location
          onLocationChange={(newLocation) =>
            setPublishAdInfo({ ...publishAdInfo, location: newLocation })
          }
        />
      )}

      {currentComponent === 7 && (
        <AdTitle
          value={publishAdInfo.title}
          onChange={(newValue: string) => handleChange("title", newValue)}
        />
      )}
      {currentComponent === 8 && (
        <AdDescription
          value={publishAdInfo.title}
          onChange={(newValue: string) => handleChange("description", newValue)}
        />
      )}
      {currentComponent === 9 && <ThirdStep />}
      {currentComponent === 10 && (
        <AdPrice
          value={publishAdInfo.price}
          onChange={(newValue: number) => handleChange("price", newValue)}
        />
      )}

      {currentComponent === 11 && <FinalStep onSubmit={handleSubmit} />}
      <ControlButtons
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        progressValue={progressValue}
      />

      <Footer />
    </ChakraProvider>
  );
}
