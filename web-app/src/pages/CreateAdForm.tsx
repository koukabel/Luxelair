import { ChakraProvider } from "@chakra-ui/react";
import CreateAdComponent from "@/components/CreateAdComponent";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { gql, useMutation } from "@apollo/client";
import FirstStep from "@/components/adCreationComponents/FirstStep/FirstStep";
import ControlButtons from "@/components/adCreationComponents/FirstStep/ControlButtons";
import { useState } from "react";
import Equipements from "@/components/adCreationComponents/SecondStep/Equipements";
import HouseType from "@/components/adCreationComponents/FirstStep/HouseType";
import SecondStep from "@/components/adCreationComponents/SecondStep/SecondStep";

export default function CreateAdForm() {
  const [currentComponent, setCurrentComponent] = useState(1);
  const [progressValue, setProgressValue] = useState(10);

  const handleNext = () => {
    setProgressValue(prevProgress => prevProgress + 10); 
    setCurrentComponent(currentComponent => currentComponent + 1);
  };

  const handlePrevious = () => {
    setProgressValue(prevProgress => prevProgress - 10); 
    setCurrentComponent(currentComponent => currentComponent - 1);
  };

  return (
    <ChakraProvider>
      <Navbar />
      {currentComponent === 1 && <FirstStep />}
      {currentComponent === 2 && <Equipements />}
      {currentComponent === 3 && <HouseType />}
      {currentComponent === 4 && <SecondStep />}
      <ControlButtons handleNext={handleNext} handlePrevious={handlePrevious} progressValue={progressValue} />

      <Footer />
    </ChakraProvider>
  );
}
