// pages/dashboard
import Layout from "../components/Layout";
import { Box, Button, VStack, ChakraProvider } from "@chakra-ui/react";
import { useState } from "react";

// Import components Dashboard
import DashboardView from "../components/dashboard/DashboardView";
import AdView from "../components/dashboard/AdView";
import CalendarView from "../components/dashboard/CalendarView";
import MessageView from "../components/dashboard/MessageView";
import BookingView from "@/components/dashboard/BookingView";
import CommentView from "@/components/dashboard/Comment";
import Navbar from "@/components/Navbar/Navbar";

export default function Dashboard() {
  const [view, setView] = useState("dashboard");

  const getComponent = () => {
    switch (view) {
      case "dashboard":
        return <DashboardView />;
      case "ad":
        return <AdView />;
      case "calendar":
        return <CalendarView />;
      case "message":
        return <MessageView />;
      case "booking":
        return <BookingView />;
      case "comment":
        return <CommentView />;
      default:
        return <Box>Page not found</Box>;
    }
  };

  return (
    <ChakraProvider>
      <Navbar />
      <Layout>
        <VStack w="20%" bg="#F6F6F6" gap={"0"}>
          <Box
            w="full"
            bg="black"
            padding="4"
            textAlign="center"
            textColor="white"
            borderBottom="1px"
            borderRadius="0"
            borderColor={"#B4770A"}
          >
            Aujourd'hui
          </Box>
          <Button
            w="full"
            bg="#F6F6F6"
            borderBottom="1px"
            borderRadius="0"
            borderColor={"#B4770A"}
            onClick={() => setView("dashboard")}
          >
            Dashboard
          </Button>
          <Button
            w="full"
            bg="#F6F6F6"
            borderBottom="1px"
            borderRadius="0"
            borderColor={"#B4770A"}
            onClick={() => setView("ad")}
          >
            Annonces
          </Button>
          <Button
            w="full"
            bg="#F6F6F6"
            borderBottom="1px"
            borderRadius="0"
            borderColor={"#B4770A"}
            onClick={() => setView("calendar")}
          >
            Calendrier
          </Button>
          <Button
            w="full"
            bg="#F6F6F6"
            borderBottom="1px"
            borderRadius="0"
            borderColor={"#B4770A"}
            onClick={() => setView("message")}
          >
            Messages
          </Button>
          <Box
            w="full"
            bg="black"
            padding="4"
            textAlign="center"
            textColor="white"
            borderBottom="1px"
            borderRadius="0"
            borderColor={"#B4770A"}
          >
            Hôte
          </Box>
          <Button
            w="full"
            bg="#F6F6F6"
            borderBottom="1px"
            borderRadius="0"
            borderColor={"#B4770A"}
            onClick={() => setView("booking")}
          >
            Mes réservations
          </Button>
          <Button
            w="full"
            bg="#F6F6F6"
            borderBottom="1px"
            borderRadius="0"
            borderColor={"#B4770A"}
            onClick={() => setView("comment")}
          >
            Mes commentaires
          </Button>
        </VStack>
        <Box flex="1" p="8" w="80%">
          {getComponent()}
        </Box>
      </Layout>
    </ChakraProvider>
  );
}
