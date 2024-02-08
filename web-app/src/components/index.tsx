import { Box, Grid, GridItem, SimpleGrid } from "@chakra-ui/react";

//get ads

export default function HomePage() {
	return (
		<div>
			<Grid templateColumns="repeat(4, 1fr)" gap={6}>
				<GridItem bg="tomato" height={80}>
					{" "}
				</GridItem>
				<GridItem bg="tomato" height={80}>
					{" "}
				</GridItem>
				<GridItem bg="tomato" height={80}>
					{" "}
				</GridItem>
				<GridItem bg="tomato" height={80}>
					{" "}
				</GridItem>
				<GridItem bg="tomato" height={80}>
					{" "}
				</GridItem>
				<GridItem bg="tomato" height={80}>
					{" "}
				</GridItem>
				<GridItem bg="tomato" height={80}>
					{" "}
				</GridItem>
				<GridItem bg="tomato" height={80}>
					{" "}
				</GridItem>
			</Grid>

			<SimpleGrid minChildWidth="130px" spacing="10px">
				<Box bg="tomato" height={80}>
					{" "}
				</Box>
				<Box bg="tomato" height={80}>
					{" "}
				</Box>
				<Box bg="tomato" height={80}>
					{" "}
				</Box>
				<Box bg="tomato" height={80}>
					{" "}
				</Box>
				<Box bg="tomato" height={80}>
					{" "}
				</Box>
				<Box bg="tomato" height={80}>
					{" "}
				</Box>
			</SimpleGrid>
		</div>
	);
}
