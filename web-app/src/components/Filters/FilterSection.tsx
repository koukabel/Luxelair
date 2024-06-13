import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faHome,
	faBuilding,
	faHotel,
	faDoorOpen,
	faChessRook,
	faShip,
	faWater,
	faCity,
	faCogs,
} from "@fortawesome/free-solid-svg-icons";
import { Button, Flex, HStack, Box, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import { useDisclosure } from "@chakra-ui/react";
import FilterDialog from "./FilterDialog";

const FilterSection = () => {
	const GET_HOUSE_TYPES = gql`
		query GetHousingTypes {
			getHousingTypes
		}
	`;

	const FILTER_BY_HOUSETYPE = gql`
		query filterType($type: String!) {
			filterByHouseType(type: $type) {
				housingType
				id
			}
		}
	`;

	const { data } = useQuery(GET_HOUSE_TYPES);
	const [filteredAds] = useLazyQuery(FILTER_BY_HOUSETYPE);
	const router = useRouter();
	const [selectedType, setSelectedType] = useState(null);
	const { isOpen, onOpen, onClose } = useDisclosure();

	const searchByHouseType = (type) => {
		setSelectedType(type);
		filteredAds({ variables: { type: selectedType } });
		router.push(`/searchResults/type-results?type=${type}`);
	};

	const getIconForType = (type) => {
		switch (type) {
			case "Chalet":
				return <FontAwesomeIcon icon={faHome} />;
			case "Appartement":
				return <FontAwesomeIcon icon={faBuilding} />;
			case "HotelParticulier":
				return <FontAwesomeIcon icon={faHotel} />;
			case "Maison":
				return <FontAwesomeIcon icon={faDoorOpen} />;
			case "Chateau":
				return <FontAwesomeIcon icon={faChessRook} />;
			case "Bateau":
				return <FontAwesomeIcon icon={faShip} />;
			case "Tour":
				return <FontAwesomeIcon icon={faCity} />;
			case "LogementSurLEau":
				return <FontAwesomeIcon icon={faWater} />;
			default:
				return <FontAwesomeIcon icon={faBuilding} />;
		}
	};

	return (
		<HStack
			spacing="24px"
			h="10vh"
			m="5px"
			justifyContent="center"
			pos="sticky"
			top="0"
			zIndex="1000"
			bg="white"
		>
			<Flex alignItems="center">
				{data?.getHousingTypes &&
					data.getHousingTypes.map((type, index) => (
						<VStack pr="50px" key={index}>
							<Box
								onClick={() => searchByHouseType(type)}
								cursor="pointer"
								color={selectedType === type ? "black" : "gray"}
								display="contents"
							>
								{getIconForType(type)}
								<Text fontSize="xs" textAlign="center">
									{type}
								</Text>
							</Box>
						</VStack>
					))}
				<Button
					leftIcon={<FontAwesomeIcon icon={faCogs} />}
					colorScheme="gray"
					variant="outline"
					pl="10px"
					fontSize="sm"
					onClick={onOpen}
				>
					Filtres
				</Button>
				{isOpen && <FilterDialog isOpen={isOpen} onClose={onClose} />}
			</Flex>
		</HStack>
	);
};

export default FilterSection;
