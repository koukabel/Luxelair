import Booking from "../entities/booking";
import {
  Resolver,
  ArgsType,
  Field,
  Mutation,
  Args,
  Query,
  Arg,
  ID,
} from "type-graphql";
import { stripe } from "../stripe";
import Payment from "../entities/payment";
@ArgsType()
export class CreateOrUpdateBooking {
  @Field()
  checkinDate!: Date;

  @Field()
  checkoutDate!: Date;

  @Field()
  totalPrice!: number;

  @Field()
  statusPayment!: boolean;

  @Field()
  adId!: string;

  @Field()
  userId!: string;
}

@Resolver()
export class BookingResolver {
  @Mutation(() => Booking)
  createBooking(@Args() args: CreateOrUpdateBooking) {
    return Booking.saveNewBooking(args);
  }

  @Query(() => [Booking])
  getBookings() {
    return Booking.getBookings();
  }
  @Query(() => Booking)
  getBooking(@Arg("id") id: string) {
    return Booking.getBooking(id);
  }

  @Query(() => [Booking])
  getBookingsByAds(@Arg("id") id: string) {
    return Booking.getBookingsByAd(id);
  }

  @Query(() => [Booking])
  getBookingsByHost(@Arg("userId", () => ID) userId: string) {
    return Booking.getBookingsByHost(userId);
  }

  @Query(() => [Booking])
  getBookingsByTraveller(@Arg("userId", () => ID) userId: string) {
    return Booking.getBookingsByTraveller(userId);
  }

  @Query(() => [Booking])
  getBookingsByHost(@Arg("userId", () => ID) userId: string) {
    return Booking.getBookingsByHost(userId);
  }

  @Query(() => [Booking])
  getBookingsByTraveller(@Arg("userId", () => ID) userId: string) {
    return Booking.getBookingsByTraveller(userId);
  }
  @Query(() => [String])
  async getSucceededBookings(@Arg("userId") userId: string): Promise<string[]> {
    try {
      const payments = await Payment.find({ where: { user: { id: userId } } });
      const succeededBookings: string[] = [];

      for (const payment of payments) {
        const checkoutSessionId = payment.stripeCheckoutSessionId;

        if (!checkoutSessionId) {
          console.log(
            `No Stripe Checkout Session ID for payment ID: ${payment.id}`
          );
          continue;
        }

        try {
          const session = await stripe.checkout.sessions.retrieve(
            checkoutSessionId
          );

          console.log(
            `Retrieved checkout session from Stripe: ${JSON.stringify(session)}`
          );

          if (session.payment_status === "paid") {
            succeededBookings.push(payment.booking.id);
            console.log(
              `Booking ID with succeeded payment: ${payment.booking.id}`
            );
          }
        } catch (error) {
          console.error(
            `Error retrieving checkout session ${checkoutSessionId}:`,
            error
          );
        }
      }

      return succeededBookings;
    } catch (error) {
      console.error("Error retrieving succeeded bookings:", error);
      throw new Error("Failed to retrieve succeeded bookings");
    }
  }
}
