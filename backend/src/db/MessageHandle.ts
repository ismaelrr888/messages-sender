import { IMessage } from "../interfaces/Message";
import MessageModel from "../models/Message";

const saveMessage = async (data: IMessage): Promise<string> => {
	const msg = { ...data };
	console.log("THE DATA", msg);

	const savedMessage = new MessageModel(msg);

	try {
		await savedMessage.save();
		console.log("Success send message and saved to MongoDB");
		return "Success send message and saved to MongoDB";
	} catch (error) {
		console.log(error);
		throw new Error("Failed to save the message to MongoDB");
	}
};

export { saveMessage };
