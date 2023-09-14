import { Resolver, Query, Mutation, Arg } from "type-graphql";
import axios from "axios";
import { MessageInput } from "../TypeObject/Message";
import { ApolloError } from "apollo-server-express";
import { saveMessage } from "../../db/MessageHandle";

@Resolver()
export class MessageResolver {
	@Query((returns) => Boolean)
	async getMessage(@Arg("id") id: string) {
		return true;
	}

	@Mutation(() => String)
	async createMessage(@Arg("input") input: MessageInput): Promise<string> {
		const token =
			process.env.NODE_ENV === "production"
				? process.env.TOKEN_PROD
				: process.env.TOKEN_DEV;

		try {
			const axiosConfig = {
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			};
			await axios.post(
				`https://graph.facebook.com/v17.0/119721974554237/messages`,
				JSON.stringify(input),
				axiosConfig
			);
			await saveMessage(input);

			return "Success send message";
		} catch (error) {
			throw new ApolloError(`${error}`);
		}
	}
}
