import {
	ChakraProvider,
	Image,
	Text,
	Stack,
	Flex,
	Container,
	Box,
	Divider,
} from "@chakra-ui/react";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import Rating from "@/components/Annonces/Rating";
import TagAd from "@/components/Annonces/TagAd";
import Toggle from "@/components/Annonces/Toggle";
import Payment from "@/components/Annonces/Payment";
import { useQuery, gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import {
	CreateBookingMutation,
	CreateBookingMutationVariables,
	GetMyProfileQuery,
} from "@/gql/graphql";
import { useState, useEffect } from "react";
import { GET_MY_PROFIL } from "../publishAd/CreateAdForm";
import { parseISO, eachDayOfInterval } from "date-fns";

const GET_BOOKINGS_BY_AD = gql`
	query GetBookingsByAds($getBookingsByAdsId: String!) {
		getBookingsByAds(id: $getBookingsByAdsId) {
			checkinDate
			checkoutDate
			id
		}
	}
`;

const GET_AD = gql`
	query ad($adId: ID!) {
		ad(id: $adId) {
			title
			price
			id
			location
			housingType
			equipements
			description
		}
	}
`;
const CREATE_BOOKING = gql`
	mutation createBooking(
		$checkinDate: DateTimeISO!
		$checkoutDate: DateTimeISO!
		$adId: String!
		$userId: String!
		$statusPayment: Boolean!
		$totalPrice: Float!
	) {
		createBooking(
			checkinDate: $checkinDate
			checkoutDate: $checkoutDate
			adId: $adId
			userId: $userId
			statusPayment: $statusPayment
			totalPrice: $totalPrice
		) {
			checkinDate
			checkoutDate
			datePayment
			id
			totalPrice
		}
	}
`;

export default function Ad() {
	const router = useRouter();
	const { id } = router.query;
	const { data } = useQuery(GET_AD, {
		variables: { adId: id as string },
	});

	const [checkIn, setCheckIn] = useState<Date | null>(null);
	const [checkOut, setCheckOut] = useState<Date | null>(null);
	const [nights, setNights] = useState(0);
	const [totalPrice, setTotalPrice] = useState(0);
	const { data: profileData, error } =
		useQuery<GetMyProfileQuery>(GET_MY_PROFIL);
	const { data: dataAds } = useQuery(GET_BOOKINGS_BY_AD, {
		variables: { getBookingsByAdsId: id as string },
	});
	const [disabledDates, setDisabledDates] = useState<Date[]>([]);

	const [newBookingInfo, setnewBooking] =
		useState<CreateBookingMutationVariables>({
			checkinDate: "",
			checkoutDate: "",
			adId: "",
			userId: "",
			statusPayment: false,
			totalPrice: 0,
		});

	const handleCheckInChange = (newValue: Date | null) => {
		setCheckIn(newValue);
		setnewBooking({
			...newBookingInfo,
			checkinDate: newValue,
		});
	};

	const handlePriceChange = (newValue: number) => {
		setTotalPrice(newValue);
		setnewBooking({
			...newBookingInfo,
			totalPrice: newValue,
		});
	};

	const handleCheckOutChange = (newValue: Date | null) => {
		setCheckOut(newValue);
		setnewBooking({
			...newBookingInfo,
			checkoutDate: newValue,
		});
	};

	useEffect(() => {
		if (checkIn && checkOut && data?.ad) {
			const diffTime = checkOut.getTime() - checkIn.getTime();
			const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
			setNights(diffDays);
			const newTotalPrice = diffDays * data.ad.price;
			setTotalPrice(newTotalPrice);
			setnewBooking({
				...newBookingInfo,
				totalPrice: newTotalPrice,
			});
		}
	}, [checkIn, checkOut, data?.ad]);

	useEffect(() => {
		if (profileData?.myProfile && data?.ad) {
			setnewBooking({
				...newBookingInfo,
				userId: profileData.myProfile.id,
				adId: data.ad.id,
			});
		}
	}, [data]);

	const [createBooking] = useMutation<
		CreateBookingMutation,
		CreateBookingMutationVariables
	>(CREATE_BOOKING);

	useEffect(() => {
		if (dataAds) {
			const updatedDisabledDates: Date[] = [];
			for (const booking of dataAds?.getBookingsByAds) {
				const startDate = parseISO(booking.checkinDate);
				const endDate = parseISO(booking.checkoutDate);
				const dates = eachDayOfInterval({ start: startDate, end: endDate });
				updatedDisabledDates.push(...dates);
			}
			setDisabledDates(updatedDisabledDates);
		}
	}, [dataAds]);


	const newBooking = async () => {
		try {
			const { data } = await createBooking({
				variables: {
					checkinDate: new Date(newBookingInfo.checkinDate).toISOString(),
					checkoutDate: new Date(newBookingInfo.checkoutDate).toISOString(),
					totalPrice: newBookingInfo.totalPrice,
					adId: newBookingInfo.adId,
					userId: newBookingInfo.userId,
					statusPayment: newBookingInfo.statusPayment,
				},
			});
			if (data) {
				router.push(`/booking/${data.createBooking.id}`);
			}
		} catch (error) {
			console.error("Error booking : ", error);
		}
	};
	const handleSubmit = () => {
		if (!profileData?.myProfile) {
			router.push(`/authentication/login`);
		} else {
			newBooking();
		}
	};

	if (data) {
		const { ad } = data;
		return (
			<ChakraProvider>
				<Navbar />
				<Text
					fontFamily={"Roboto"}
					fontWeight={"bold"}
					marginTop={"200px"}
					textAlign={"center"}
					fontSize={{ base: "2xl", md: "4xl" }}
				>
					{ad.title.toUpperCase()}
				</Text>
				<Flex
					width="100%"
					justifyContent="center"
					alignItems="center"
					padding="10px"
				>
					<Box flex="1" padding="5px">
						<Image
							src="https://static-cms.routard.com/web-routard/uploads/xlarge_nice_1466255_d6980c20c2.jpg"
							alt="Small Image 1"
							width="100%"
							borderRadius="md"
						/>
					</Box>
					<Box flex="2" padding="5px">
						<Image
							src={`/file-hosting/${id}.jpg`}
							alt="Main Image"
							width="100%"
							borderRadius="md"
						/>
					</Box>
					<Box flex="1" padding="5px">
						<Image
							src="https://edito.seloger.com/sites/default/files/styles/735x412/public/images/web/2022-01/centre-ville-nice-seloger.jpg?itok=0HkXzuEb"
							alt="Small Image 2"
							width="100%"
							borderRadius="md"
						/>
					</Box>
				</Flex>
				<Box
					fontFamily={"Raleway"}
					textAlign="center"
					fontSize={{ base: "lg", md: "2xl", lg: "3xl" }}
					marginBottom={"3%"}
					marginRight={"3%"}
					marginLeft={"3%"}
				>
					{ad.description}
				</Box>
				{/* Banniere Image */}

				<Box width="100%" height="200px" my={4}>
					<Image
						src="/abstract_separateur.jpeg"
						alt="Banner Image"
						objectFit="fill"
						width="100%"
						height="100%"
					/>
				</Box>
				<Stack spacing={5} m="auto" width="84%" mt={5} textAlign="left">
					{/* rubrique 1  */}
					<Flex alignItems="center" justifyContent="center" mb={2}>
						<Box flex="1" height="1px" bg="#B4770A" />
						<Text
							fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
							fontWeight="bold"
						>
							La Destination
						</Text>
						<Box flex="1" height="1px" bg="#B4770A" />
					</Flex>
					<Text
						fontFamily={"Raleway"}
						textAlign="center"
						fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
					>
						{ad.location}
					</Text>
					{/* rubrique 2 */}

					<Flex alignItems="center" justifyContent="center" mb={2}>
						<Box flex="1" height="1px" bg="#B4770A" />
						<Text
							fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
							fontWeight="bold"
						>
							Votre Hôte
						</Text>
						<Box flex="1" height="1px" bg="#B4770A" />
					</Flex>
					<Flex alignItems={"center"} gap={"3"}>
						<Image
							borderRadius="full"
							boxSize="80px"
							src={
								"https://cultivatedculture.com/wp-content/uploads/2019/12/LinkedIn-Profile-Picture-Example-Rachel-Montan%CC%83ez.jpeg"
							}
							alt=""
						/>
						<Text
							fontFamily={"Raleway"}
							textAlign="center"
							fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
						>
							Amandine Dupont
						</Text>
					</Flex>
					{/* rubrique 3 */}
					<Flex alignItems="center" justifyContent="center" mb={2}>
						<Box flex="1" height="1px" bg="#B4770A" />
						<Text
							fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
							fontWeight="bold"
						>
							Vos Services
						</Text>
						<Box flex="1" height="1px" bg="#B4770A" />
					</Flex>
					<Box
						fontFamily={"Raleway"}
						textAlign="left"
						fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
					>
						{ad.equipements}
					</Box>
					<Rating />
					<TagAd />
					{/* rubrique 4 */}
					<Flex alignItems="center" justifyContent="center" mb={2}>
						<Box flex="1" height="1px" bg="#B4770A" />
						<Text
							mx={2}
							fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
							fontWeight="bold"
						>
							Réserver maintenant votre séjour
						</Text>
						<Box flex="1" height="1px" bg="#B4770A" />
					</Flex>
				</Stack>

				<Stack margin="3%">
					<Flex width="100%" justifyContent="center" alignItems="center">
						<Container
							alignContent="center"
							width={{ base: "90%", md: "70%", lg: "60%" }}
							padding={4}
						>
							<Payment
								price={ad.price}
								nights={nights}
								totalPrice={totalPrice}
								checkIn={checkIn}
								checkOut={checkOut}
								onCheckInChange={handleCheckInChange}
								onCheckOutChange={handleCheckOutChange}
								onPriceChange={handlePriceChange}
								onSubmit={handleSubmit}
								disabledDates={disabledDates}
							/>
						</Container>
					</Flex>
				</Stack>

				<Footer />
			</ChakraProvider>
		);
	}
}
