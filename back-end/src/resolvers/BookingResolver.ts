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
}
