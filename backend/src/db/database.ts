import mongoose from "mongoose";

const DB_URI =
	process.env.MONGO_URI_PROD || "mongodb://localhost:27017/message";

const connectDB = async () => {
	try {
		await mongoose.connect(DB_URI);
		console.log("MongoDB Connected");
	} catch (error) {
		console.error("Error connecting to MongoDB:", error);
	}
};

export default connectDB;
