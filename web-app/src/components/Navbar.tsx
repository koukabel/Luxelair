import React from "react";
import { Flex, Image, Heading, Spacer, Link, Avatar } from "@chakra-ui/react";

export default function Navbar() {
  return (
    <Flex alignItems="center">
      <Link href="/">
        <Image src="../logoWhite.png" boxSize="150px" objectFit="contain" />
      </Link>
      <Heading className="mainHeading">LUXELAIR</Heading>
      <Spacer />
      <Flex direction="row" alignItems="center" gap={5} padding="10">
        <Link
          cursor={"pointer"}
          fontWeight="light"
          fontSize="16px"
          href="/CreateAdForm"
        >
          Mettre ma propriété sur Luxelair
        </Link>

        <Avatar cursor="pointer" bg="#B4770A" />
      </Flex>
    </Flex>
  );
}
