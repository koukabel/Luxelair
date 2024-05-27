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
  @Mutation(() => String) //mutation to create a chechout session for stripe payment
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
          price_data: {
            currency,
            product_data: {
              name: "Booking Payment",
            },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      metadata: {
        bookingId,
        userId,
      },
    });

    return session.id;
  }

  @Mutation(() => Payment)
  async createStripePayment(
    @Arg("amount") amount: number,
    @Arg("currency") currency: string,
    @Arg("bookingId") bookingId: string,
    @Arg("userId") userId: string
  ): Promise<Payment> {
    try {
      return await Payment.createStripePayment(
        amount,
        currency,
        bookingId,
        userId
      );
    } catch (error) {
      console.error("Error creating Stripe payment:", error);
      throw new Error("Failed to create Stripe payment");
    }
  }

  @Query(() => Payment)
  async getPaymentById(@Arg("id") id: string): Promise<Payment> {
    return await Payment.getPaymentById(id);
  }
}
