import { StarIcon } from "@chakra-ui/icons";
import { Box, Image } from "@chakra-ui/react";

export default function ProfileHoteImg() {
	return (
		<Box>
			<Image
				borderRadius="full"
				boxSize="80px"
				src="https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/profile-picture-12.jpg"
				alt="Béatrice Jean"
			/>
		</Box>
	);
}
