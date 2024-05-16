import {
	Table,
	TableCaption,
	TableContainer,
	Tbody,
	Td,
	Tfoot,
	Th,
	Thead,
	Tr,
} from "@chakra-ui/react";

import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";

export default function BookingView() {
	return (
		<div>
			<h1>Mes réservations en cours : </h1>
			<TableContainer>
				<Table variant="striped">
					<TableCaption>Mes réservations en cours</TableCaption>
					<Thead>
						<Tr>
							<Th>Voyageur</Th>
							<Th>Date entrée</Th>
							<Th isNumeric>Nombre de nuits</Th>
						</Tr>
					</Thead>
					<Tbody>
						<Tr>
							<Td>Béatrice</Td>
							<Td>16 mai 24</Td>
							<Td isNumeric>3</Td>
						</Tr>
						<Tr>
							<Td>Khouloud</Td>
							<Td>25 mai 24</Td>
							<Td isNumeric>3</Td>
						</Tr>
						<Tr>
							<Td>Vincent</Td>
							<Td>6 juin 24</Td>
							<Td isNumeric>1</Td>
						</Tr>
						<Tr>
							<Td>Arnaud</Td>
							<Td>16 juillet 24</Td>
							<Td isNumeric>10</Td>
						</Tr>
					</Tbody>
				</Table>
			</TableContainer>
		</div>
	);
}
