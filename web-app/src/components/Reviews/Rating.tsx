import { StarIcon } from "@chakra-ui/icons";
import { Box, Image } from "@chakra-ui/react";

export default function Rating({ note = 4 }) {
	// Créez un tableau de longueur noteMax pour représenter toutes les étoiles
	const range = [1, 2, 3, 4, 5];

	return (
		<Box>
			<StarIcon color={"#B4770A"} />
			<StarIcon color={"#B4770A"} />
			<StarIcon color={"#B4770A"} />
			<StarIcon color={"grey"} />
			<StarIcon color={"grey"} />
		</Box>
	);
}
