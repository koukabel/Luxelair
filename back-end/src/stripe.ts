
import Stripe from 'stripe';
import express from 'express';
import { PaymentResolver } from './resolvers/PaymentResolver';


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
});

const stripeRouter = express.Router();

stripeRouter.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!sig || !webhookSecret) {
      console.error('Missing Stripe signature or webhook secret');
      return res.status(400).send('Webhook Error: Missing Stripe signature or webhook secret');
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err) {
      console.error(`Webhook signature verification failed: ${err}`);
      return res.status(400).send('Webhook Error: Signature verification failed');
    }

    const { type, data } = event;

    if (type === 'checkout.session.completed') {
      const session = data.object as Stripe.Checkout.Session;
      const bookingId = session.metadata?.bookingId;

      if (bookingId) {
        console.log(bookingId)
        try {
          const paymentResolver = new PaymentResolver();
          await paymentResolver.handlePaymentIntentSucceededWebhook(bookingId);
          console.log('Payment status updated successfully');
        } catch (error) {
          console.error('Error handling webhook event:', error);
        }
      } else {
        console.warn('No bookingId in event metadata');
      }
    }

    res.status(200).json({ received: true });
  }
);

export { stripe, stripeRouter };
