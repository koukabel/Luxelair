import { Badge, Box, Image, Link, Text } from "@chakra-ui/react";

interface props {
  id: string;
  location: string;
  price: number;
  image: string;
  title: string
}

const Card: React.FC<props> = ({ id, location, price, title, image }) => {
  return (
    <Link href={`/ad/${id}`} _hover={{ textDecoration: "none" }}>
      <Box
        cursor="pointer"
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
      >
        <Image objectFit="cover" src={image} alt="" />
        <Box display="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" bg="#B4770A" color="white">
            New
          </Badge>
        </Box>
      </Box>
      <Box
        mt="1"
        as="h4"
        lineHeight="tight"
        noOfLines={1}
      >
        {title}
      </Box>

      <Box
        mt="1"
       as="h4"
        lineHeight="tight"
        noOfLines={1}
      >
           <Text fontSize="sm" color="blackAlpha.600">  {location}</Text>
      </Box>

      <Box>
        <Text fontSize="sm"  > {price}  € par nuit</Text>
      </Box>
    </Link>
  );
};

export default Card;
