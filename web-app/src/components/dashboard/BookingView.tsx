import { gql, useQuery } from "@apollo/client";
import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

const GET_BOOKINGS_BY_HOST = gql`
  query GetBookingsByHost($userId: ID!) {
    getBookingsByHost(userId: $userId) {
      checkinDate
      checkoutDate
      datePayment
      id
      status
      statusPayment
      totalPrice
      ad {
        id
        title
      }
      user {
        firstName
        lastName
      }
    }
  }
`;

export default function BookingView() {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useQuery(GET_BOOKINGS_BY_HOST, {
    variables: {
      userId: id,
    },
  });

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
            {data &&
              data.getBookingsByHost.map((booking) => (
                <Tr key={booking.id}>
                  <Td>
                    {booking.user.firstName} {booking.user.lastName}
                  </Td>
                  <Td>{new Date(booking.checkinDate).toDateString()}</Td>
                  <Td isNumeric>3</Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}
