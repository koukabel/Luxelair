import { Tag, HStack } from "@chakra-ui/react";

export default function TagAd() {
  return (
    <HStack spacing={4}>
      {["lg"].map((size) => (
        <Tag
          size={size}
          key={size}
          variant="solid"
          colorScheme="teal"
          bg="#B4770A"
        >
          Confort
        </Tag>
      ))}
    </HStack>
  );
}
