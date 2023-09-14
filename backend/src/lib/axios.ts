import axios from "axios";

const token =
	process.env.NODE_ENV === "production"
		? process.env.TOKEN_PROD
		: process.env.TOKEN_DEV;

const axiosClient = axios.create({
	baseURL: "https://graph.facebook.com/v17.0/119721974554237/",
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	},
});

export default axiosClient;
