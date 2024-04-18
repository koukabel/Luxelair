import {
	AbsoluteCenter,
	Box,
	Divider,
	Flex,
	IconButton,
} from "@chakra-ui/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@chakra-ui/icons";
import { useState } from "react";


interface Props {
image: ""
  }
  
  const Slider: React.FC<Props> = ({image }) => {
	const [currentSlide, setCurrentSlide] = useState(0);

	const goToPrevious = () => {
		//setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1);
	};

	const goToNext = () => {
		//setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1);
	};

	return (
		<Flex justifyContent="center">
			<Box
				w="84vw"
				h="400px"
				// bgImage={image}
				bgSize="cover"
				bgPosition="center"
				rounded="10px"
				position="relative"
			>
				<IconButton
					icon={<ArrowLeftIcon />}
					aria-label="flèche gauche"
					position="absolute"
					top="180px"
					left="16px"
					onClick={goToPrevious}
				/>
				<IconButton
					icon={<ArrowRightIcon />}
					aria-label="flèche droite"
					position="absolute"
					top="180px"
					right="16px"
					onClick={goToNext}
				/>
				<Box position="relative" padding="10">
					<Divider />
					<AbsoluteCenter bg="white" px="4">
						{/* {currentSlide + 1}/{images.length} */}
					</AbsoluteCenter>
				</Box>
			</Box>
		</Flex>
	);
}

export default Slider;