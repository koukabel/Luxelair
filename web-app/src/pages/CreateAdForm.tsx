import { ChakraProvider } from "@chakra-ui/react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FirstStep from "@/components/adCreationComponents/FirstStep/FirstStep";
import ControlButtons from "@/components/adCreationComponents/FirstStep/ControlButtons";
import { SetStateAction, useState } from "react";
import Equipements from "@/components/adCreationComponents/SecondStep/Equipements";
import HouseType from "@/components/adCreationComponents/FirstStep/HouseType";
import SecondStep from "@/components/adCreationComponents/SecondStep/SecondStep";
import Location from "@/components/adCreationComponents/FirstStep/Location";
import AdTitle from "@/components/adCreationComponents/SecondStep/AdTitle";
import AdDescription from "@/components/adCreationComponents/SecondStep/AdDescription";
import ThirdStep from "@/components/adCreationComponents/ThirdStep/ThirdStep";
import { Input } from "@chakra-ui/react";
import AdPrice from "@/components/adCreationComponents/ThirdStep/AdPrice";
import FinalStep from "@/components/adCreationComponents/ThirdStep/FinalStep";
import { gql, useMutation } from "@apollo/client";
import router from "next/router";
import { AdCreationMutation, AdCreationMutationVariables } from "@/gql/graphql";
import ImageUploader from "@/components/adCreationComponents/SecondStep/UploadAdImage";

export default function CreateAdForm() {
  const [currentComponent, setCurrentComponent] = useState(1);
  const [progressValue, setProgressValue] = useState(10);
  const [publishAdInfo, setPublishAdInfo] = useState<AdCreationMutationVariables>({
    title: "",
    description: "",
    location: "",
    price: 0,
    equipements: [],
    housingType: null,
  });
  const [fileInForm, setFileInForm] = useState<File | null>(null);

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
    mutation adCreation(
      $title: String!
      $description: String!
      $location: String!
      $price: Float!
      $equipements: [String!]
      $housingType: HousingTypeEnum
    ) {
      createAd(
        title: $title
        description: $description
        location: $location
        price: $price
        equipements: $equipements
        housingType: $housingType
      ) {
        id
      }
    }
  `;

  const [createAd] = useMutation<AdCreationMutation, AdCreationMutationVariables>(
    CREATE_AD
  );

  const uploadImage = async (id: string) => {
    const { readAndCompressImage } = await import("browser-image-resizer");
    if (fileInForm) {
      const resizedJpgFile = await readAndCompressImage(fileInForm, {
        quality: 0.75,
        maxWidth: 1440,
      });
      const body = new FormData();
      body.append("file", resizedJpgFile, `${id}.jpg`);
      await fetch("/file-hosting", {
        method: "POST",
        body,
      });
    }
  };

  const publishAd = async () => {
    try {
      const { data } = await createAd({
        variables: {
          title: publishAdInfo.title,
          price: publishAdInfo.price as number,
          location: publishAdInfo.location,
          description: publishAdInfo.description,
          equipements: publishAdInfo.equipements,
          housingType: publishAdInfo.housingType,
        },
      });

      if (data) {
        const { id } = data.createAd;
        await uploadImage(id);
        router.push(`/ad/${data.createAd.id}`)
      }
    } catch (error) {
      console.error("Error publishing ad:", error);
    }
  };

  const handleSubmit = () => {
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
              equipements: selectedValues,
            })
          }
        />
      )}
      {currentComponent === 3 && (
        <HouseType
          onSelectedTypeChange={(housingType) =>
            setPublishAdInfo({
              ...publishAdInfo,
              housingType: housingType,
            })
          }
        />
      )}

      {currentComponent === 4 && <SecondStep />}
      {currentComponent === 5 && 
      <ImageUploader onFileSelect={(file: File | null) => setFileInForm(file)}  />}

      {currentComponent === 6 && (
        <Location
          onLocationChange={(newLocation: string) =>
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
          value={publishAdInfo.description}
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
