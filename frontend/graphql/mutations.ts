import { gql } from "@apollo/client";

export const REGISTER_MUTATION = gql`
	mutation register($input: UserInput!) {
		register(input: $input) {
			name
			email
		}
	}
`;

export const LOGIN_MUTATION = gql`
	mutation login($input: UserLoginInput!) {
		login(input: $input) {
			email
			password
		}
	}
`;
