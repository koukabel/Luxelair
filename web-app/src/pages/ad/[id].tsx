import {
  ChakraProvider,
  Image,
  Text,
  Stack,
  Flex,
  Container,
  Box,
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
        <Flex justifyContent="center">
          <Box
            w="84vw"
            h="400px"
            bgSize="cover"
            bgPosition="center"
            rounded="10px"
            position="relative"
          >
            <Image src={`/file-hosting/${id}.jpg`} alt="" />
          </Box>
        </Flex>
        <Stack spacing={4} m="auto" width="84%" mt={5} textAlign="left">
          <Flex justifyContent="flex-start">
            <Box>
              <Image borderRadius="full" boxSize="80px" src={""} alt="" />
            </Box>
          </Flex>
          <TagAd />
          <Text fontSize="2xl">{ad.title}</Text>
          <Text fontSize="1xl">{ad.location} </Text>
          <Rating />
        </Stack>
        <Stack margin="3%">
          <Flex
            width={"100%"}
            justifyContent="space-around"
            alignItems="center"
          >
            <Container alignContent={"center"}>
              <Toggle
                description={ad.description}
                equipements={ad.equipements}
              />
            </Container>
            <Container alignContent={"center"}>
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
              />{" "}
            </Container>
          </Flex>
        </Stack>
        <Footer />
      </ChakraProvider>
    );
  }
}
