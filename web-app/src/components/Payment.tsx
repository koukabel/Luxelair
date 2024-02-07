import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Stack,
	Heading,
	Divider,
	Button,
	ButtonGroup,
	Text,
	Input,
	Flex,
	Container,
} from "@chakra-ui/react";

export default function Payment() {
	return (
		<Flex justifyContent="center">
			<Card maxW="lm" width={"70%"}>
				<CardBody>
					<Stack mt="6" spacing="3">
						<Flex justifyContent="space-between">
							<Heading size="md">75€/nuit</Heading>
							<Heading size="md">7 reviews</Heading>
						</Flex>
						<Flex>
							<Input
								placeholder="Check-in"
								size="md"
								fontFamily="Montserrat"
								fontWeight="regular"
								fontSize="12px"
								type="date"
							/>
							<Input
								placeholder="Check-out"
								size="md"
								fontFamily="Montserrat"
								fontWeight="regular"
								fontSize="12px"
								type="date"
							/>
						</Flex>
						<Input
							placeholder="Guest"
							size="md"
							fontFamily="Montserrat"
							fontWeight="regular"
							fontSize="12px"
							type="number"
						/>
						<Button variant="solid" bg={"#B4770A"} color={"white"}>
							Réserver
						</Button>
						<Text color="black.400" fontSize="sl" textAlign="center">
							You won't be charged
						</Text>
					</Stack>
				</CardBody>
				<Divider />
				<CardFooter>
					<Flex justifyContent="space-between" width="100%">
						<Container>
							<Text align="center" size="md">
								79€ x 7 nuit
							</Text>
						</Container>
						<Container>
							<Text align="center" size="md">
								555€
							</Text>
						</Container>
					</Flex>
					{/* <Flex>
					<Container>
						<Text color="blue.600" fontSize="2xl">
							$79 x 7 night
						</Text>
						<Text color="blue.600" fontSize="2xl">
							$555
						</Text>
					</Container>
				</Flex> */}
					{/* <Container>
					<Text color="blue.600" fontSize="2xl">
						Total : $450
					</Text>
				</Container> */}
				</CardFooter>
			</Card>
		</Flex>
	);
}
