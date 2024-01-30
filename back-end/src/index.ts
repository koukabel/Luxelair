// import { DataSource } from "typeorm";
// import "reflect-metadata";

// import { ApolloServer } from "@apollo/server";
// import { startStandaloneServer } from "@apollo/server/standalone";
// import { buildSchema } from "type-graphql";



// const PORT = 4000;
// const startApolloServer = async () => {
//   const schema = await buildSchema({
//     re, solvers: [AdResolver, TagResolver]
//     validate: true,
//   });
//   const server = new ApolloServer({ schema });

//   const { url } = await startStandaloneServer(server, {
//     listen: { port: PORT },
//   });

//   await dataSource.initialize();

//   console.log(`🚀  Server ready at: ${url}`);
// };

// startApolloServer();

const express = require('express');
const app = express();
const port = 3000;


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
