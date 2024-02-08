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
									79€ x 7 nuit
								</Text>
							</Container>
							<Container>
								<Text align="right" size="md">
									555€
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
									602€
								</Text>
							</Container>
						</Flex>
					</Flex>
				</CardFooter>
			</Card>
		</Flex>
	);
}
