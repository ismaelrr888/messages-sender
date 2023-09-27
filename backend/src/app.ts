import "reflect-metadata";
import express from "express";
require("dotenv").config();
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./graphql/resolvers/HelloResolver";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import connectDB from "./db/database";
import "reflect-metadata";
import { MessageResolver } from "./graphql/resolvers/MessageResolver";
import { AuthResolver } from "./graphql/resolvers/AuthResolvers";

async function bootstrap() {
	const app = express();
	// connected to database
	await connectDB();
	// Create a TypeGraphQL schema
	const schema = await buildSchema({
		// Add your resolvers here
		resolvers: [HelloResolver, MessageResolver, AuthResolver],
	});

	// Create an Apollo Server instance
	const server = new ApolloServer({
		schema,
		plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
		cache: "bounded",
		context: ({ res, req }) => ({ res, req }),
	});

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
