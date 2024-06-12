import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import Payment, { PaymentStatusEnum } from "../entities/payment";
import User from "../entities/user";
import Booking from "../entities/booking";
import { stripe } from "../stripe";
@InputType()
export class EditOrCreatePayment {
  @Field()
  amount!: number;

  @Field()
  currency!: string;

  @Field()
  description!: string;

  @Field()
  createdAt!: Date;

  @Field(() => PaymentStatusEnum, { nullable: true })
  status!: PaymentStatusEnum;

  @Field()
  user_id!: string;

  @Field()
  booking_id!: string;
}

@Resolver()
export class PaymentResolver {

  @Query(() => Payment)
  async getPaymentByBookingById(@Arg("id") id: string): Promise<Payment> {
    return await Payment.getPaymentByBookingId(id);
  }


  @Query(() => Payment)
  async getPaymentById(@Arg("id") id: string): Promise<Payment> {
    return await Payment.getPaymentById(id);
  }

  //create payment 
  @Mutation(() => String)
  async createStripeCheckoutSession(
    @Arg("amount") amount: number,
    @Arg("currency") currency: string,
    @Arg("bookingId") bookingId: string,
    @Arg("userId") userId: string
  ): Promise<string> {
    const user = await User.findOne({ where: { id: userId } });
    const booking = await Booking.findOne({ where: { id: bookingId } });
    if (!user || !booking) {
      throw new Error("User or Booking not found");
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: "price_1PQVOf07GbaJqaED3CpdNNHZ", //stripe product id
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/payment/success`,
      cancel_url: `${process.env.FRONTEND_URL}/payment/cancel`,
      metadata: {
        bookingId,
        userId,
      },
    });
    const payment = Payment.create({
      amount,
      currency,
      status: PaymentStatusEnum.Pending,
      booking,
      user,
    });

    await payment.save();
    return session.id;
  }

}
