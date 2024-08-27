// pages/dashboard
import Layout from "../../components/Layout";
import { Box, Button, VStack, ChakraProvider, Flex } from "@chakra-ui/react";
import { useState } from "react";

// Import components Dashboard
import DashboardView from "../../components/dashboard/DashboardView";
import AdView from "../../components/dashboard/AdView";
import CalendarView from "../../components/dashboard/CalendarView";
import MessageView from "../../components/dashboard/MessageView";
import BookingView from "@/components/dashboard/BookingView";
import CommentView from "@/components/dashboard/Comment";
import Navbar from "@/components/Navbar/Navbar";
import { ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";

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
			<Box height="100vh" display="flex" flexDirection="column">
				<Navbar />
				<Flex flex="1" overflow="auto" mt="182px">
					<VStack w={{ base: "100%", md: "20%" }} bg="#F6F6F6" gap={"0"}>
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
							bg={view === "dashboard" ? "#E2E8F0" : "#F6F6F6"}
							borderBottom="1px"
							borderRadius="0"
							borderColor={"#B4770A"}
							onClick={() => setView("dashboard")}
							rightIcon={
								view === "dashboard" ? <ChevronRightIcon /> : undefined
							}
						>
							Dashboard
						</Button>
						<Button
							w="full"
							bg={view === "ad" ? "#E2E8F0" : "#F6F6F6"}
							borderBottom="1px"
							borderRadius="0"
							borderColor={"#B4770A"}
							onClick={() => setView("ad")}
							rightIcon={view === "ad" ? <ChevronRightIcon /> : undefined}
						>
							Annonces
						</Button>
						<Button
							w="full"
							bg={view === "calendar" ? "#E2E8F0" : "#F6F6F6"}
							borderBottom="1px"
							borderRadius="0"
							borderColor={"#B4770A"}
							onClick={() => setView("calendar")}
							rightIcon={view === "calendar" ? <ChevronRightIcon /> : undefined}
						>
							Calendrier
						</Button>
						<Button
							w="full"
							bg={view === "message" ? "#E2E8F0" : "#F6F6F6"}
							borderBottom="1px"
							borderRadius="0"
							borderColor={"#B4770A"}
							onClick={() => setView("message")}
							rightIcon={view === "message" ? <ChevronRightIcon /> : undefined}
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
							bg={view === "booking" ? "#E2E8F0" : "#F6F6F6"}
							borderBottom="1px"
							borderRadius="0"
							borderColor={"#B4770A"}
							onClick={() => setView("booking")}
							rightIcon={view === "booking" ? <ChevronRightIcon /> : undefined}
						>
							Mes réservations
						</Button>
						<Button
							w="full"
							bg={view === "comment" ? "#E2E8F0" : "#F6F6F6"}
							borderBottom="1px"
							borderRadius="0"
							borderColor={"#B4770A"}
							onClick={() => setView("comment")}
							rightIcon={view === "comment" ? <ChevronRightIcon /> : undefined}
						>
							Mes commentaires
						</Button>
					</VStack>
					<Box flex="1" p="8" w={{ base: "100%", md: "80%" }}>
						{getComponent()}
					</Box>
				</Flex>
			</Box>
		</ChakraProvider>
	);
}
