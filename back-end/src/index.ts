import { DataSource } from "typeorm";
import "reflect-metadata";
import Ad from "./entities/ad";
import Booking from "./entities/booking";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { AdResolver } from "./resolvers/AdResolver";
import User from "./entities/user";
import { UserResolver } from "./resolvers/UserResolver";
import { BookingResolver } from "./resolvers/BookingResolver";
import { AuthChecker } from "type-graphql";
import UserSession from "./entities/userSession";
import { Response } from "express";
import { getUserSessionIdFromCookie } from "./utils/cookie";

export type Context = { res: Response; user: User | null };

const authChecker: AuthChecker<Context> = ({ context }) => {
  return Boolean(context.user);
};

const dataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities: [Ad, User, Booking, UserSession],
  synchronize: true,
});

const buildSchemaAsync = async () => {
  const { buildSchema } = await import("type-graphql");
  return buildSchema({
    resolvers: [AdResolver, UserResolver, BookingResolver],
    validate: true,
    authChecker,
  });
};

const startServer = async () => {
  const schema = await buildSchemaAsync();

  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }): Promise<Context> => {
      const userSessionId = getUserSessionIdFromCookie(req);
      const user = userSessionId
        ? await User.getUserWithSessionId(userSessionId)
        : null;
      return { res: res as Response, user };
    },
  });

  await dataSource.initialize();

  //Booking.calculerPrixTotal();

  console.log(`🚀  Server ready at: ${url}`);
};

startServer();
