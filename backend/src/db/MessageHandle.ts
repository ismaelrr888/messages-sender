import { IMessage } from "../interfaces/Message";
import MessageModel from "../models/Message";

const saveMessageToDb = async (data: IMessage): Promise<string> => {
	const msg = { ...data };
	console.log("THE DATA", msg);

	const savedMessage = new MessageModel(msg);

	try {
		await savedMessage.save();
		console.log("Success send message and saved to MongoDB");
		return "Success send message and saved to MongoDB";
	} catch (error) {
		console.log(error);
		throw new Error("Failed to save the message");
	}
};

const getMessagesFromDb = async (): Promise<IMessage[]> => {
	try {
		const messages: IMessage[] = await MessageModel.find<IMessage>({});
		return messages;
	} catch (error) {
		throw new Error("Failed fetch messages");
	}
};

export { saveMessageToDb, getMessagesFromDb };
