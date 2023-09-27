"use client";
import { GET_MESSAGES } from "@/graphql/queries";
import { useQuery } from "@apollo/client";

const MessagesList = () => {
	const { data } = useQuery(GET_MESSAGES);
	console.log(data);
	return <div>Messages</div>;
};

export default MessagesList;
