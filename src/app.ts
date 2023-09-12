import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/HelloResolver";

async function bootstrap() {
  const app = express();

  // Create a TypeGraphQL schema
  const schema = await buildSchema({
    // Add your resolvers here
    resolvers: [HelloResolver],
  });

  // Create an Apollo Server instance
  const server = new ApolloServer({ schema });

  // Start the Apollo Server
  await server.start();

  // Apply the Apollo middleware to your Express app
  server.applyMiddleware({ app });

  // Start the Express server
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/graphql`);
  });
}

bootstrap();
