import { gql } from "@apollo/client";

export const GET_MESSAGES = gql`
	query {
		getMessages {
			messaging_product
			to
			type
			template {
				name
				language {
					code
				}
			}
		}
	}
`;
