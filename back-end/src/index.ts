import { DataSource } from "typeorm";
import "reflect-metadata";
import Ad from "./entities/ad";

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { AdResolver } from "./resolvers/AdResolver";

const dataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities: [Ad],
  synchronize: true,
});


const buildSchemaAsync = async () => {
  const { buildSchema } = await import("type-graphql");
  return buildSchema({
    resolvers: [AdResolver],
  });
};

const startServer = async () => {
  const schema = await buildSchemaAsync();

  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  await dataSource.initialize();

  console.log(`🚀  Server ready at: ${url}`);
};

startServer();
