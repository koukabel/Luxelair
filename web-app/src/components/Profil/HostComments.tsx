import React from "react";
import {
	Box,
	Avatar,
	Text,
	Stack,
	Heading,
	SimpleGrid,
} from "@chakra-ui/react";

const commentaires = [
	{
		id: 1,
		name: "Alex",
		date: "12 Mars 2023",
		text: "Superbe séjour, hôte très accueillant et emplacement parfait !",
		avatarImg:
			"https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/profile-picture-11.jpg",
	},
	{
		id: 2,
		name: "Jordan",
		date: "9 Avril 2023",
		text: "Magnifique vue et appartement très confortable. Fortement recommandé.",
		avatarImg:
			"https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/profile-picture-2.jpg",
	},
	{
		id: 3,
		name: "Henry",
		date: "9 Avril 2023",
		text: "Magnifique vue et appartement très confortable. Fortement recommandé.",
		avatarImg: "",
	},
	{
		id: 4,
		nom: "Julie",
		date: "9 Avril 2023",
		text: "Magnifique vue et appartement très confortable. Fortement recommandé.",
		avatarImg:
			"https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/profile-picture-7.jpg",
	},
];

export default function HostComments() {
	return (
		<Box padding="5">
			<Heading as="h2" size="xl" marginBottom="5">
				Mes Commentaires des voyageurs
			</Heading>
			<SimpleGrid columns={[1, null, 2]} spacing="40px">
				{commentaires.map(({ id, name, date, text, avatarImg }) => (
					<Box
						key={id}
						borderWidth="1px"
						borderRadius="lg"
						overflow="hidden"
						p="6"
					>
						<Stack direction="row" spacing={4} align="center" marginBottom="4">
							<Avatar name={name} src={avatarImg} />
							<Box>
								<Text fontWeight="bold">{name}</Text>
								<Text fontSize="sm" color="gray.500">
									{date}
								</Text>
							</Box>
						</Stack>
						<Text>{text}</Text>
					</Box>
				))}
			</SimpleGrid>
		</Box>
	);
}
