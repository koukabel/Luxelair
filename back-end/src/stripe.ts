import Stripe from "stripe";
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import Payment, { PaymentStatusEnum } from "./entities/payment"; // Adjust the path as necessary

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
});

const webhookHandler = express.Router();

// Use the raw body to handle Stripe webhooks
webhookHandler.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  async (req: Request, res: Response) => {
    const sig = req.headers["stripe-signature"]!;
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } catch (err) {
      console.error(`Webhook signature failed.`, );
      return res.status(400).send(`Webhook Error: `);
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session;
        const metadata = session.metadata;
        if (metadata && metadata.bookingId && metadata.userId) {
          const bookingId = metadata.bookingId;
      const payment = await Payment.getPaymentByBookingId(bookingId);
          // Update the payment status
          try {
            payment.status = PaymentStatusEnum.Confirmed;
            await payment.save();
          } catch (err) {
            payment.status = PaymentStatusEnum.Failed;
            await payment.save();
            console.error(`Error updating payment status:`);
            return res.status(500).send(`Internal Server Error`);
          }
        } else {
          console.error("Metadata is missing required fields");
          return res.status(400).send("Metadata is missing required fields");
        }
        break;
      // Handle other event types as needed
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.status(200).json({ received: true });
  }
);

export { stripe, webhookHandler };
