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
  Box,
} from "@chakra-ui/react";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface PaymentProps {
  price: number;
  nights: number;
  totalPrice: number;
  checkIn: Date | null;
  checkOut: Date | null;
  onCheckInChange: (newValue: Date | null) => void;
  onCheckOutChange: (newValue: Date | null) => void;
  onPriceChange: (newValue: number) => void;
  onSubmit: () => void;
  disabledDates: Date[];
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
  disabledDates,
}) => {
  const handleCheckInChange = (date: Date | null) => {
    onCheckInChange(date);
  };

  const handleCheckOutChange = (date: Date | null) => {
    onCheckOutChange(date);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onPriceChange(parseFloat(e.target.value));
  };

  const handleClick = () => {
    onSubmit();
  };

  return (
    <Flex justifyContent="center">
      <Card maxW="lm" width={"80%"}>
        <CardBody>
          <Stack mt="6" spacing="5">
            <Flex justifyContent="space-between">
              <Heading size="md">Prix total:</Heading>
              <Heading size="md">{price} €</Heading>
            </Flex>
            <Flex justifyContent={"space-between"}>
              <Box>
                <DatePicker
                  onChange={(date) => handleCheckInChange(date)}
                  minDate={new Date()}
                  disabled={false}
                  excludeDates={disabledDates}
                  selected={checkIn}
                  className="custom-datepicker"
                  placeholderText="Date d'arrivée"
                />
                <DatePicker
                  onChange={(date) => handleCheckOutChange(date)}
                  minDate={new Date()}
                  excludeDates={disabledDates}
                  selected={checkOut}
                  className="custom-datepicker"
                  placeholderText="Date de départ"
                />
              </Box>
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
