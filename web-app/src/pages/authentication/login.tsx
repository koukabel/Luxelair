import {
  ChakraProvider,
} from "@chakra-ui/react";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import Authentication from "@/components/Authentication/Authentication";
import Register from "@/components/Authentication/Register";
import { useState } from "react";

export default function login() {

  const [isSignUp, setIsSignUp] = useState(false);

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <ChakraProvider>
      <Navbar />
      {isSignUp ? <Register /> : <Authentication onSignUpClick={toggleSignUp} />}
      <Footer />
    </ChakraProvider>
  );
}
