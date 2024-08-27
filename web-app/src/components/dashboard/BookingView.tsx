import { gql, useQuery } from "@apollo/client";
import {
  Box,
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

interface Booking {
  checkinDate: Date;
  checkoutDate: Date;
  datePayment: Date;
  id: string;
  status: boolean;
  statusPayment: boolean;
  totalPrice: number;
  ad: {
    id: string;
    title: string;
  };
  user: {
    firstName: string;
    lastName: string;
  };
}

export default function BookingView() {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useQuery(GET_BOOKINGS_BY_HOST, {
    variables: {
      userId: id,
    },
  });

  const calculateNights = (checkIn: Date, checkOut: Date) => {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const diffTime = checkOutDate.getTime() - checkInDate.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const bookingFinish = data?.getBookingsByHost.filter((booking: Booking) => {
    const checkoutDate = new Date(booking.checkoutDate);
    return checkoutDate < new Date();
  });

  const bookingPending = data?.getBookingsByHost.filter((booking: Booking) => {
    const checkoutDate = new Date(booking.checkoutDate);
    return checkoutDate > new Date();
  });
  console.log(bookingPending);

  return (
    <>
      <div>
        <h1>Mes réservations en cours : </h1>
        <TableContainer>
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th>Voyageur</Th>
                <Th>Date entrée</Th>
                <Th>Date de sortie</Th>
                <Th>Logement concerné</Th>
                <Th isNumeric>Nombre de nuits</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data && bookingPending.length > 0 ? (
                bookingPending.map((booking: Booking) => (
                  <Tr key={booking.id}>
                    <Td>
                      {booking.user.firstName} {booking.user.lastName}
                    </Td>
                    <Td>{new Date(booking.checkinDate).toDateString()}</Td>
                    <Td>{new Date(booking.checkoutDate).toDateString()}</Td>
                    <Td>{booking.ad.title}</Td>
                    <Td isNumeric>
                      {calculateNights(
                        booking.checkinDate,
                        booking.checkoutDate
                      )}
                    </Td>
                  </Tr>
                ))
              ) : (
                <p>Pas de réservation en cours</p>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
      <Box marginTop="5rem">
        <h1>Mes réservations terminées : </h1>
        <TableContainer>
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th>Voyageur</Th>
                <Th>Date entrée</Th>
                <Th>Date de sortie</Th>
                <Th>Logement concerné</Th>
                <Th isNumeric>Nombre de nuits</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data && bookingFinish.length > 0 ? (
                bookingFinish.map((booking: Booking) => (
                  <Tr key={booking.id}>
                    <Td>
                      {booking.user.firstName} {booking.user.lastName}
                    </Td>
                    <Td>{new Date(booking.checkinDate).toDateString()}</Td>
                    <Td>{new Date(booking.checkoutDate).toDateString()}</Td>
                    <Td>{booking.ad.title}</Td>
                    <Td isNumeric>
                      {calculateNights(
                        booking.checkinDate,
                        booking.checkoutDate
                      )}
                    </Td>
                  </Tr>
                ))
              ) : (
                <p>Pas de réservation en cours</p>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
