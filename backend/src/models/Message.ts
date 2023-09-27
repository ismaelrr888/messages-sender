import mongoose, { Schema, Document, models } from "mongoose";

const templateSchema = new Schema({
	name: { type: String, required: true },
	language: {
		code: { type: String, required: true },
	},
});

const messageSchema = new Schema(
	{
		messaging_product: { type: String, required: true },
		to: { type: String, required: true },
		type: { type: String, required: true },
		template: { type: templateSchema, required: true },
	},
	{
		timestamps: true,
	}
);

interface IMessage extends Document {
	messaging_product: string;
	to: string;
	type: string;
	template: {
		name: string;
		language: {
			code: string;
		};
	};
}

const MessageModel =
	models.MessageModel || mongoose.model<IMessage>("Message", messageSchema);

export default MessageModel;
