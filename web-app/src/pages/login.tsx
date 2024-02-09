import {
  ChakraProvider,
} from "@chakra-ui/react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Authentification from "@/components/Authentification"
import Register from "@/components/Register"
import TestRegister from "@/pages/TestRegister"
import { useState } from "react";

export default function login() {

  const [isSignUp, setIsSignUp] = useState(false);

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <ChakraProvider>
      <Navbar />
      {/*  {isSignUp ? <Register /> : <Authentification onSignUpClick={toggleSignUp} />} */}
      <TestRegister />
      <Footer />
    </ChakraProvider>
  );
}
