import {
  Card,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  Divider,
  Button,
  Text,
  Input,
  Flex,
  Container,
} from "@chakra-ui/react";
import React from "react";

interface PaymentProps {
  price: number;
  nights: number;
  totalPrice: number;
  checkIn: string;
  checkOut: string;
  onCheckInChange: (newValue: string) => void;
  onCheckOutChange: (newValue: string) => void;
  onPriceChange: (newValue: number) => void;
  onSubmit: () => void;
}

const Payment: React.FC<PaymentProps> = ({
  price,
  nights,
  totalPrice,
  checkIn,
  checkOut,
  onCheckInChange,
  onCheckOutChange,
  onPriceChange,
  onSubmit,
}) => {
  const handleCheckInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCheckInChange(e.target.value);
  };

  const handleCheckOutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCheckOutChange(e.target.value);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onPriceChange(parseFloat(e.target.value));
  };

  const handleClick = () => {
    onSubmit();
  };

  return (
    <Flex justifyContent="center">
      <Card maxW="lm" width={"70%"}>
        <CardBody>
          <Stack mt="6" spacing="3">
            <Flex justifyContent="space-between">
              <Heading size="md">{price} €</Heading>
              <Heading size="md">7 reviews</Heading>
            </Flex>
            <Flex>
              <Input
                placeholder="Check-in"
                size="md"
                name="checkIn"
                fontFamily="Montserrat"
                fontWeight="regular"
                fontSize="12px"
                type="date"
                value={checkIn}
                onChange={handleCheckInChange}
              />
              <Input
                placeholder="Check-out"
                size="md"
                name="checkOut"
                fontFamily="Montserrat"
                fontWeight="regular"
                fontSize="12px"
                type="date"
                value={checkOut}
                onChange={handleCheckOutChange}
              />
            </Flex>
            <Button
              variant="solid"
              bg={"#B4770A"}
              color={"white"}
              onClick={handleClick}
            >
              Réserver
            </Button>
            <Text color="black.400" fontSize="sl" textAlign="center">
              Vous n'aurez pas encore à payer
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <Flex flexDirection="column" width="100%" gap="4">
            <Flex justifyContent="space-between" width="100%">
              <Container>
                <Text align="left" size="md">
                  {price}€ x {nights} nuits
                </Text>
              </Container>
              <Container>
                <Text align="right" size="md">
                  {totalPrice}€
                </Text>
              </Container>
            </Flex>
            <Flex justifyContent="space-between" width="100%">
              <Container>
                <Text align="left" size="md">
                  frais de nettoyage
                </Text>
              </Container>
              <Container>
                <Text align="right" size="md">
                  20€
                </Text>
              </Container>
            </Flex>
            <Flex justifyContent="space-between" width="100%">
              <Container>
                <Text align="left" size="md">
                  frais de service
                </Text>
              </Container>
              <Container>
                <Text align="right" size="md">
                  15€
                </Text>
              </Container>
            </Flex>
            <Flex justifyContent="space-between" width="100%">
              <Container>
                <Text align="left" size="md">
                  Taxe d'occupation
                </Text>
              </Container>
              <Container>
                <Text align="right" size="md">
                  12€
                </Text>
              </Container>
            </Flex>
            <Divider color="black" />
            <Flex justifyContent="space-between" width="100%">
              <Container>
                <Text align="left" size="md">
                  Total
                </Text>
              </Container>
              <Container>
                <Text align="right" size="md">
                  {totalPrice}€
                </Text>
              </Container>
              <Input
                size="md"
                hidden
                name="totalPrice"
                fontFamily="Montserrat"
                fontWeight="regular"
                fontSize="16px"
                type="number"
                value={`${totalPrice} `}
                onChange={handlePriceChange}
              />
            </Flex>
          </Flex>
        </CardFooter>
      </Card>
    </Flex>
  );
};

export default Payment;
