import { Box, Image, Text, Stack, Heading, SimpleGrid } from "@chakra-ui/react";

// Data for fake annonces
const annonces = [
	{
		id: 1,
		titre: "Charmant studio au cœur de la ville",
		description: "Magnifique  studio parfait pour un séjour en ville.",
		image:
			"https://cf.bstatic.com/xdata/images/hotel/max1024x768/385403270.jpg?k=80ec418f4b53c1d49ce403cdb385d33e7ae992f2eca54c9cd5b044e4df802b34&o=&hp=1",
	},
	{
		id: 2,
		titre: "Grand chalet au pied des pistes",
		description: "Grand chalet familial, à deux pas des pistes",
		image:
			"https://www.chatelreservation.com/medias/images/prestations/multitailles/800x600_chalets-bovard-chalet-spencer-chatel-4199037.jpg",
	},
	{
		id: 3,
		titre: "Appartement de standing, bord de Mer ",
		description: "Profitez de la vue magnifique sur Mer et du levé de soleil ",
		image:
			"https://cdn.clevacances.com/images/locations/29/HLOBRE029NO15470/b0.jpg?1516103494",
	},
	{
		id: 4,
		titre: "Ferrme rénové avec champs de vigne  ",
		description:
			"En plein campagne, venez dégustez les meilleures vins et résider dans une ferme rénové",
		image:
			"https://blogs.cotemaison.fr/mademoiselle-cecile/files/2019/01/Maison-dhotes-de-prestige-Guest-House-5-Lasserre-Bordeaux-3.jpg",
	},
];

export default function MyAds() {
	return (
		<>
			<Box padding="5">
				<Heading as="h2" size="xl" marginBottom="5">
					Mes Annonces en ligne
				</Heading>
				<SimpleGrid columns={[1, null, 4]} spacing="80px">
					{annonces.map(({ id, titre, description, image }) => (
						<Box key={id} borderWidth="1px" borderRadius="lg" overflow="hidden">
							<Image
								height={"300px"}
								width={"310px"}
								objectFit={"cover"}
								src={image}
								alt={`Image de l'annonce ${titre}`}
							/>
							<Box p="2">
								<Stack spacing={6}>
									<Text
										fontWeight="bold"
										fontSize="xl"
										lineHeight="tight"
										isTruncated
										whiteSpace={"normal"}
									>
										{titre}
									</Text>
									<Text color="gray.500" fontSize="sm">
										{description}
									</Text>
								</Stack>
							</Box>
						</Box>
					))}
				</SimpleGrid>
			</Box>
		</>
	);
}
