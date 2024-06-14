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
import { useState } from "react";
import { useRouter } from "next/router";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Pagination } from "swiper/modules";
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

	const searchByHouseType = (type: any) => {
		setSelectedType(type);
		filteredAds({ variables: { type: selectedType } });
		router.push(`/searchResults/type-results?type=${type}`);
	};

	const getIconForType = (type: any) => {
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
		<div
			style={{
				position: "sticky",
				top: "0",
				zIndex: "0",
				background: "white",
				padding: "5px",
			}}
		>
			<Swiper
				spaceBetween={10}
				slidesPerView={2}
				pagination={{ clickable: true }}
				breakpoints={{
					640: {
						slidesPerView: 2,
						spaceBetween: 10,
					},
					768: {
						slidesPerView: 3,
						spaceBetween: 10,
					},
					1024: {
						slidesPerView: 5,
						spaceBetween: 10,
					},
				}}
				modules={[Pagination]}
			>
				{data?.getHousingTypes &&
					data.getHousingTypes.map((type: any, index: any) => (
						<SwiperSlide key={index}>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
									margin: "10%",
									cursor: "pointer",
									color: selectedType === type ? "black" : "gray",
								}}
								onClick={() => searchByHouseType(type)}
							>
								{getIconForType(type)}
								<p style={{ fontSize: "12px", textAlign: "center" }}>{type}</p>
							</div>
						</SwiperSlide>
					))}
			</Swiper>
			<button
				style={{
					marginTop: "10px",
					padding: "10px",
					fontSize: "14px",
					borderColor: "gray",
					backgroundColor: "white",
					cursor: "pointer",
					width: "100%",
				}}
			>
				<FontAwesomeIcon icon={faCogs} /> Filtres
			</button>
		</div>
	);
};

export default FilterSection;
