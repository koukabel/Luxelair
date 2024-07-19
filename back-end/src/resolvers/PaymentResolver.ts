import { ObjectType, Field, InputType, Arg, Mutation, Query, Resolver } from "type-graphql";
import Payment, { PaymentStatusEnum } from "../entities/payment";
import User from "../entities/user";
import Booking from "../entities/booking";
import { stripe } from "../stripe";
import Stripe from "stripe";


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
            currency,
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

    return session.id;
  }



  @Query(() => String)
async getPaymentStatus(
  @Arg("bookingId") bookingId: string
): Promise<string> {
  try {

    const payment = await Payment.getPaymentByBookingId(bookingId);
    if (!payment) {
      console.log(`Payment not found for booking ID: ${bookingId}`);
      throw new Error("Payment not found for booking ID");
    }
    console.log(`Retrieved payment: ${JSON.stringify(payment)}`);


    const paymentIntent = await stripe.paymentIntents.retrieve(payment.id);

    console.log(`Retrieved payment intent from Stripe: ${JSON.stringify(paymentIntent)}`);

    // Check the status of the payment intent and log it
    const status = paymentIntent.status;
    console.log(`Payment intent status: ${status}`);

    if (status === 'succeeded') {
      if (payment.status !== PaymentStatusEnum.Confirmed) {
        payment.status = PaymentStatusEnum.Confirmed;
        await payment.save();
      }
      console.log(`Payment status updated to: ${PaymentStatusEnum.Confirmed}`);
      return PaymentStatusEnum.Confirmed;
    } else if (status === 'canceled') {
      if (payment.status !== PaymentStatusEnum.Failed) {
        payment.status = PaymentStatusEnum.Failed;
        await payment.save();
      }
      console.log(`Payment status updated to: ${PaymentStatusEnum.Failed}`);
      return PaymentStatusEnum.Failed;
    } else if (status === 'processing' || status === 'requires_action' || status === 'requires_capture' || status === 'requires_confirmation' || status === 'requires_payment_method') {
      console.log(`Payment status is pending`);
      return PaymentStatusEnum.Pending;
    } else {
      console.error(`Unexpected payment status: ${status}`);
      return PaymentStatusEnum.Pending;
    }
  } catch (error) {
    console.error("Error retrieving payment status:", error);
    throw new Error("Failed to retrieve payment status");
  }
}

}
