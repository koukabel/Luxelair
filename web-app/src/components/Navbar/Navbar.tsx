import React, { useState } from "react";
import {
	Flex,
	Image,
	Link,
	Avatar,
	Button,
	useBreakpointValue,
	IconButton,
	Drawer,
	DrawerBody,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	VStack,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Box,
} from "@chakra-ui/react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { HamburgerIcon, ChevronDownIcon } from "@chakra-ui/icons";

const GET_MY_PROFILE = gql`
	query GetMyProfile {
		myProfile {
			email
			id
			firstName
			lastName
		}
	}
`;

const LOGOUT = gql`
	mutation SignOut {
		signOut
	}
`;

export default function Navbar() {
	const { data } = useQuery(GET_MY_PROFILE);
	const [signOut] = useMutation(LOGOUT);

	const handleSignOut = async () => {
		await signOut();
	};

	const buttonSize = useBreakpointValue({ base: "sm", md: "md" });
	const isMobile = useBreakpointValue({ base: true, md: false });
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const handleDrawerOpen = () => {
		setIsDrawerOpen(true);
	};

	const handleDrawerClose = () => {
		setIsDrawerOpen(false);
	};

	return (
		<Flex
			bg="white"
			position="fixed"
			top="0"
			width="100%"
			zIndex="1 "
			alignItems="center"
			boxShadow="0 4px 10px rgba(0, 0, 0, 0.15)"
			p={{ base: 2, md: 4 }}
		>
			<Link href="/" width={"30%"}>
				<Image
					src="/logo_white.png"
					boxSize={{ base: "100px", md: "150px" }}
					objectFit="fill"
				/>
			</Link>
			<Flex
				direction="column"
				alignItems="center"
				flex="1"
				textAlign="center"
				style={{ fontFamily: "HussarBold" }}
				justifyContent={"center"}
			>
				<Box fontWeight="bold" width="50%" textAlign={"center"}>
					<Image
						fontSize={{ base: "2xl", md: "4xl" }} //
						src="/luxelair_title_logo.svg"
					/>
				</Box>
			</Flex>

			<Flex
				width={"30%"}
				ml="auto"
				alignItems="center"
				justifyContent={"flex-end"}
			>
				{isMobile ? (
					<>
						<IconButton
							icon={<HamburgerIcon />}
							variant="outline"
							onClick={handleDrawerOpen}
							aria-label="Open Menu"
						/>
						<Drawer
							isOpen={isDrawerOpen}
							placement="right"
							onClose={handleDrawerClose}
						>
							<DrawerOverlay />
							<DrawerContent>
								<DrawerCloseButton />
								<DrawerHeader>Menu</DrawerHeader>
								<DrawerBody>
									<VStack spacing={4} align="start">
										<Link
											cursor="pointer"
											fontWeight="light"
											fontSize="16px"
											href={
												data?.myProfile
													? "/publishAd/CreateAdForm"
													: "/authentication/login"
											}
										>
											Mettre ma propriété sur Luxelair
										</Link>
										{data?.myProfile ? (
											<>
												<Link
													cursor="pointer"
													fontWeight="light"
													fontSize="16px"
													href={`/profil/traveler/${data?.myProfile.id}`}
												>
													Mode Voyageur
												</Link>
												<Link
													cursor="pointer"
													fontWeight="light"
													fontSize="16px"
													href={`/dashboard/${data?.myProfile.id}`}
												>
													Mode Hôte
												</Link>
												<Link
													cursor="pointer"
													fontWeight="light"
													fontSize="16px"
													onClick={handleSignOut}
													href={`/authentication/login`}
												>
													Déconnexion
												</Link>
											</>
										) : (
											<Link
												cursor="pointer"
												fontWeight="light"
												fontSize="16px"
												href="/authentication/login"
											>
												Connexion
											</Link>
										)}
									</VStack>
								</DrawerBody>
							</DrawerContent>
						</Drawer>
					</>
				) : (
					<Flex
						fontFamily={"Raleway"}
						direction="row"
						alignItems="center"
						gap={5}
						p={4}
						justifyContent={"flex-end"}
					>
						<Link
							cursor="pointer"
							fontSize="16px"
							href={
								data?.myProfile
									? "/publishAd/CreateAdForm"
									: "/authentication/login"
							}
						>
							Mettre ma propriété sur Luxelair
						</Link>
						{data?.myProfile ? (
							<>
								<Link
									cursor="pointer"
									fontSize="16px"
									onClick={handleSignOut}
									href={`/authentication/login`}
								>
									Déconnexion
								</Link>
								<Menu>
									<MenuButton
										as={Button}
										bg="transparent"
										_hover={{ bg: "transparent" }}
										_active={{ bg: "transparent" }}
										size={buttonSize}
									>
										<Avatar cursor="pointer" bg="#B4770A" />
										<ChevronDownIcon />
									</MenuButton>
									<MenuList>
										<MenuItem
											as={Link}
											href={`/profil/traveler/${data?.myProfile.id}`}
										>
											Mode Voyageur
										</MenuItem>
										<MenuItem
											as={Link}
											href={`/dashboard/${data?.myProfile.id}`}
										>
											Mode Hôte
										</MenuItem>
									</MenuList>
								</Menu>
							</>
						) : (
							<Link
								cursor="pointer"
								fontSize="16px"
								href="/authentication/login"
							>
								Connexion
							</Link>
						)}
					</Flex>
				)}
			</Flex>
		</Flex>
	);
}
