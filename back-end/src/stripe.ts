import Stripe from "stripe";
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { PaymentResolver } from "./resolvers/PaymentResolver";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
});

const webhookHandler = express.Router();

webhookHandler.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  async (req: Request, res: Response) => {
    const sig = req.headers["stripe-signature"];
    if (!sig) {
      console.error("Missing stripe-signature header");
      return res.status(400).send("Webhook Error: Missing stripe-signature header");
    }

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
      console.log("Webhook event verified successfully:", event);
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return res.status(401).send("Webhook Error: Signature verification failed");
    }

    const paymentResolver = new PaymentResolver();

    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const metadata = paymentIntent.metadata;
        if (metadata && metadata.bookingId) {
          const bookingId = metadata.bookingId;
          try {
            console.log(`Payment succeeded for booking ID: ${bookingId}`);
            const statusUpdated = await paymentResolver.handlePaymentIntentSucceededWebhook(bookingId);
            console.log(`Payment status updated: ${statusUpdated}`);
          } catch (error) {
            console.error("Failed to update payment status:", error);
          }
        }
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.status(200).json({ received: true });
  }
);

export { stripe, webhookHandler };



























// webhookHandler.post(
//   "/webhook",
//   bodyParser.raw({ type: "application/json" }),
//   async (req: Request, res: Response) => {
//     const sig = req.headers["stripe-signature"];
//     if (!sig) {
//       console.error("Missing stripe-signature header");
//       return res.status(400).send("Webhook Error: Missing stripe-signature header");
//     }

//     let event;

//     try {
//       event = stripe.webhooks.constructEvent(
//         req.body,
//         sig,
//         process.env.STRIPE_WEBHOOK_SECRET!
//       );
//     } catch (err) {
//       console.error("Webhook signature verification failed:", err);
//       return res.status(400).send(`Webhook Error}`);
//     }


//     const paymentResolver = new PaymentResolver();


//     switch (event.type) {
//       case "payment_intent.succeeded":
//         //  payment success
//         const paymentIntent = event.data.object as Stripe.PaymentIntent;
//         const metadata = paymentIntent.metadata;
//         if (metadata && metadata.bookingId) {
//           const bookingId = metadata.bookingId;
//           // Update payment status here
//           const statusUpdated = await paymentResolver.handlePaymentIntentSucceededWebhook(bookingId);

//           console.log(`Payment status updated`);
//         }
//         break;

//       default:
//         console.log(`Unhandled event type ${event.type}`);
//     }

//     res.status(200).json({ received: true });
//   }
// );





