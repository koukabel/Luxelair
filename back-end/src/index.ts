import { DataSource } from "typeorm";
import "reflect-metadata";
import Ad from "./entities/ad";
import Booking from "./entities/booking"

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { AdResolver } from "./resolvers/AdResolver";
import User from "./entities/user";
import { UserResolver } from "./resolvers/UserResolver";
import {BookingResolver} from "./resolvers/BookingResolver"
import { EquipmentResolver } from "./resolvers/EquipementResolver";
const dataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities: [Ad, User, Booking],
  synchronize: true,
});


const buildSchemaAsync = async () => {
  const { buildSchema } = await import("type-graphql");
  return buildSchema({
    resolvers: [AdResolver, UserResolver, BookingResolver, EquipmentResolver],
  });
};

const startServer = async () => {
  const schema = await buildSchemaAsync();

  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  await dataSource.initialize();

  //Booking.calculerPrixTotal();

  console.log(`🚀  Server ready at: ${url}`);
};

startServer();
