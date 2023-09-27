import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "text", placeholder: "jsmith" },
				password: { label: "Password", type: "password" },
			},
			authorize: async (credentials, req) => {
				const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						query: `
                            mutation {
                                login(input: {
                                        email: "${credentials?.email}",
                                        password: "${credentials?.password}"
                                }) {
                                    email
                                    name
                                }
                            }
                        `,
					}),
				});

				const { data } = await response.json();

				console.log(data);

				return data.login;
			},
		}),
	],
	callbacks: {
		jwt: ({ token, user }) => {
			if (user) token.user = user;
			return token;
		},
		session: ({ session, token }) => {
			session.user = token.user as { id: string; name: string; email: string };
			return session;
		},
	},
	pages: {
		signIn: "/login",
	},
});

export { handler as GET, handler as POST };
