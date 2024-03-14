import { StarIcon } from "@chakra-ui/icons";
import { Box, Image } from "@chakra-ui/react";

export default function ProfileVoyageurImg() {
	return (
		<Box>
			<Image
				borderRadius="full"
				boxSize="80px"
				src="https://bit.ly/dan-abramov"
				alt="Alexandre Abramov"
			/>
		</Box>
	);
}
