import { Box, Image } from "@chakra-ui/react";

export default function ProfileTravelerImg() {
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
