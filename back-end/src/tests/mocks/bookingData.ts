import Booking from "../../entities/booking";
import Ad from "../../entities/ad";
import User from "../../entities/user";

export const createBookings = async (ads: Ad[], users: User[]) => {
  const bookings = await Promise.all([
    Booking.create({
      checkinDate: new Date("2024-07-01"),
      checkoutDate: new Date("2024-07-10"),
      totalPrice: 2000,
      status: true,
      datePayment: new Date(),
      statusPayment: true,
      user: users[0],
      ad: ads[0],
    }).save(),
    Booking.create({
      checkinDate: new Date("2024-08-01"),
      checkoutDate: new Date("2024-08-10"),
      totalPrice: 1500,
      status: false,
      datePayment: new Date(),
      statusPayment: false,
      user: users[1],
      ad: ads[1],
    }).save(),
    Booking.create({
      checkinDate: new Date("2024-09-01"),
      checkoutDate: new Date("2024-09-10"),
      totalPrice: 3000,
      status: true,
      datePayment: new Date(),
      statusPayment: true,
      user: users[2],
      ad: ads[2],
    }).save(),
  ]);

  return bookings;
};
