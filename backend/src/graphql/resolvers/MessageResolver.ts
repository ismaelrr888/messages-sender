import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Message, MessageInput } from "../TypeObject/Message";
import { ApolloError } from "apollo-server-express";
import { getMessagesFromDb, saveMessageToDb } from "../../db/MessageHandle";
import axiosClient from "../../lib/axios";

@Resolver()
export class MessageResolver {
	@Query((returns) => Boolean)
	async getMessage(@Arg("id") id: string) {
		return true;
	}

	@Mutation(() => String)
	async createMessage(@Arg("input") input: MessageInput): Promise<string> {
		try {
			await axiosClient.post("messages", JSON.stringify(input));
			await saveMessageToDb(input);

			return "Success send message";
		} catch (error) {
			throw new ApolloError(`${error}`);
		}
	}
	@Query(() => [Message])
	async getMessages(): Promise<Message[]> {
		const message = await getMessagesFromDb();
		return message;
	}
}
