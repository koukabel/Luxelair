import { StarIcon } from "@chakra-ui/icons";
import { Box, Image } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function Rating({ note = 4 }) {
  // Créez un tableau de longueur noteMax pour représenter toutes les étoiles
  const range = [1, 2, 3, 4, 5];

  return (
    <Box>
      <FontAwesomeIcon icon={faStar} color={"#B4770A"} />
      <FontAwesomeIcon icon={faStar} color={"#B4770A"} />
      <FontAwesomeIcon icon={faStar} color={"#B4770A"} />
      <FontAwesomeIcon icon={faStar} color={"grey"} />
      <FontAwesomeIcon icon={faStar} color={"grey"} />
    </Box>
  );
}
