import { ObjectType, Field, InputType, Arg, Mutation, Query, Resolver } from "type-graphql";
import Payment, { PaymentStatusEnum } from "../entities/payment";
import User from "../entities/user";
import Booking from "../entities/booking";
import { stripe } from "../stripe";
import PaymentStatusResult from "../utils/PaymentStatusResult";


export @InputType()
class EditOrCreatePayment {
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
    const amountInCents = amount * 100;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            unit_amount: amountInCents,
            currency: 'eur',
            product: "prod_QAeATtmABPgraI"
          },
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

   @Mutation(() => PaymentStatusResult)
  //  async handlePaymentIntentSucceededWebhook(
  //    @Arg("bookingId") bookingId: string
  //  ): Promise<PaymentStatusResult> {
  //    // Update payment status logic here
  //    // For example, you could update the payment status in your database
  //    const payment = await Payment.findOne({ where: { booking_id: bookingId } });
  //    if (!payment) {
  //      throw new Error(`Payment with booking ID ${bookingId} not found`);
  //    }
  //    payment.status = PaymentStatusEnum.Completed;
  //    await payment.save();
 
  //    return {
  //      success: true,
  //      message: `Payment for booking ID ${bookingId} successfully updated`,
  //    };
  //  }
  @Mutation(() => Boolean)
  async handlePaymentIntentSucceededWebhook(
    @Arg("bookingId") bookingId: string
  ): Promise<boolean> {
    try {
      const payment = await Payment.findOne({ where: { booking_id: bookingId } });
      if (!payment) {
        throw new Error(`Payment with booking ID ${bookingId} not found`);
      }

      // Update payment status to "completed" if it's not already updated
      if (payment.status !== PaymentStatusEnum.Confirmed) {
        payment.status = PaymentStatusEnum.Confirmed;
        await payment.save();
      }

      return true;
    } catch (error) {
      console.error("Error updating payment status:", error);
      return false;
    }
  }
}

