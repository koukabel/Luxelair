import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { graphql } from "graphql";
import { buildSchema } from "type-graphql";
import { PaymentResolver } from "./resolvers/PaymentResolver";
import { stripe } from "./stripe";

export const createWebhookMiddleware = async () => {
  const schema = await buildSchema({
    resolvers: [PaymentResolver],
    validate: true,
  });

  const webhookHandler = express.Router();
  webhookHandler.use(bodyParser.raw({ type: "application/json" }));

  webhookHandler.post('/webhook', async (req: Request, res: Response) => {
    const sig = req.headers["stripe-signature"];
    if (!sig) {
      console.error("Missing stripe-signature header");
      return res.status(400).send("Webhook Error: Missing stripe-signature header");
    }

    const payload = req.body.toString();

    const result = await graphql({
      schema,
      source: `
        mutation($payload: String!, $signature: String!) {
          handleWebhookSuccess(payload: $payload, signature: $signature)
        }
      `,
      variableValues: { payload, signature: sig },
      contextValue: { req, res, stripe },
    });

    if (result.errors) {
      console.error("GraphQL errors:", result.errors);
      return res.status(500).send("Webhook Error: Internal Server Error");
    }

    res.status(200).json({ received: result.data?.handleWebhookSuccess });
  });

  return webhookHandler;
};
