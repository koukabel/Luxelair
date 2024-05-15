import {
	ChakraProvider,
	Image,
	Text,
	Heading,
	Stack,
	Flex,
	Container,
	Box
} from "@chakra-ui/react";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import Slider from "@/components/Annonces/Slider";
import Rating from "@/components/Annonces/Rating";
import TagAd from "@/components/Annonces/TagAd";
import Toggle from "@/components/Annonces/Toggle";
import Payment from "@/components/Annonces/Payment";
import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";
import { AdsQuery, AdsQueryVariables } from "@/gql/graphql";

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

export default function Ad() {
	const router = useRouter();
	const { id } = router.query;
	const { data } = useQuery(GET_AD, {
		variables: { adId: id as string },
	});

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
				<Image src={`/file-hosting/${id}.jpg`} alt=""/>
				</Box>
				</Flex>
				<Stack spacing={4} m="auto" width="84%" mt={5} textAlign="left">
					<Flex justifyContent="flex-start">
					<Box>
			<Image
				borderRadius="full"
				boxSize="80px"
				src={""}
				alt=""
			/>
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
							<Toggle description={ad.description} equipements={ad.equipements}/>
						</Container>
						<Container alignContent={"center"}>
							<Payment price={ad.price} />
						</Container>
					</Flex>
				</Stack>
				<Footer />
			</ChakraProvider>
		);
	}
}
