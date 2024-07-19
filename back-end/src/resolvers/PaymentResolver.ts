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

  @Mutation(() => Boolean)
  async handlePaymentIntentSucceededWebhook(
    @Arg("bookingId") bookingId: string
  ): Promise<boolean> {
    try {
      const payment = await Payment.findOne({ where: { booking: { id: bookingId } } });
      if (!payment) {
        throw new Error(`Payment with booking ID ${bookingId} not found`);
      }

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

  @Mutation(() => Boolean)
  async handleWebhookSuccess(
    @Arg("payload") payload: string,
    @Arg("signature") signature: string
  ): Promise<boolean> {
    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        payload,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
      console.log("Webhook event verified successfully:", event);
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return false;
    }

    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const metadata = paymentIntent.metadata;
        if (metadata && metadata.bookingId) {
          const bookingId = metadata.bookingId;
          try {
            console.log(`Payment succeeded for booking ID: ${bookingId}`);
            const statusUpdated = await this.handlePaymentIntentSucceededWebhook(bookingId);
            console.log(`Payment status updated: ${statusUpdated}`);
            return statusUpdated;
          } catch (error) {
            console.error("Failed to update payment status:", error);
            return false;
          }
        }
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
        return false;
    }

    return true;
  }
}
