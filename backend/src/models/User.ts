import { Document, Schema, model, models } from "mongoose";

interface IUser extends Document {
	name: string;
	email: string;
	password: string;
}

const userSchema = new Schema<IUser>({
	name: {
		type: String,
		required: [true, "Please enter a name"],
		minlength: [3, "Name must be at least 3 characters long"],
		maxlength: [15, "Name must be at most 15 characters long"],
	},
	email: {
		type: String,
		required: [true, "Please enter an email"],
		unique: true,
		match: [
			/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
			"Please enter a valid email",
		],
	},
	password: {
		type: String,
		required: [true, "Please enter a password"],
		select: false,
	},
});

const UserModel = models.User || model<IUser>("User", userSchema);

export default UserModel;
