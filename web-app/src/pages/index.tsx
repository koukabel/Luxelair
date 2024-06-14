import { ChakraProvider, Heading } from "@chakra-ui/react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import Card from "../components/Ad/Card";
import { Image } from "@chakra-ui/react";
import { gql, useQuery } from "@apollo/client";
import { Ad, AdsQuery } from "@/gql/graphql";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import SearchBar from "@/components/Navbar/SearchBar";
import FilterSection from "@/components/Filters/FilterSection";
import { Divider } from "@chakra-ui/react";
import { Global, css } from "@emotion/react";

const GET_ADS = gql`
	query Ads {
		getAds {
			location
			price
			title
			id
		}
	}
`;

export default function HomePage() {
	const { data } = useQuery<AdsQuery>(GET_ADS);
	return (
		<ChakraProvider>
			<Global
				styles={css`
					body {
						margin: 0;
						overflow-x: hidden;
					}
				`}
			/>
			<Navbar />
			<SearchBar />
			<Divider />
			<FilterSection />
			<Box pos="relative" w="100%" overflow="hidden">
				<Image
					margin="auto"
					objectFit="cover"
					src="welcome_page.png"
					alt="Welcome Page"
					w="100%"
				/>
				<Box
					pos="absolute"
					top="0"
					left="0"
					right="0"
					bottom="0"
					display="flex"
					justifyContent="center"
					alignItems="center"
				>
					<Heading
						color="white"
						textAlign="center"
						fontSize={["2xl", "3xl", "4xl", "5xl"]}
					>
						LuxeLair.. Où le bien-être commence
					</Heading>
				</Box>
			</Box>
			<SimpleGrid w="100%" padding="10" minChildWidth="200px" spacing="50px">
				{data?.getAds
					? data.getAds.map((ad) => (
							<Card
								key={ad.id}
								id={ad.id}
								price={ad.price}
								location={ad.location}
								image={`/file-hosting/${ad.id}.jpg`}
							/>
					  ))
					: null}
			</SimpleGrid>
			<Footer />
		</ChakraProvider>
	);
}
