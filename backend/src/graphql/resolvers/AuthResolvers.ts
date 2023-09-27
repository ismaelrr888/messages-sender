import { Resolver, Mutation, Arg } from "type-graphql";
import { ApolloError } from "apollo-server-express";
import { User, UserInput, UserLoginInput } from "../TypeObject/Auth";
import UserModel from "../../models/User";
import bcrypt from "bcryptjs";

@Resolver()
export class AuthResolver {
	@Mutation(() => User)
	async register(@Arg("input") input: UserInput): Promise<User | undefined> {
		try {
			const userExist = await UserModel.findOne({ email: input.email });

			if (userExist) throw new ApolloError("Email already exist");

			const hashedPassword = await bcrypt.hash(input.password, 12);

			const user = new UserModel<User>({
				name: input.name,
				email: input.email,
				password: hashedPassword,
			});

			const userSaved: User = await user.save();

			return userSaved as User | undefined;
		} catch (error) {
			if (error instanceof Error) throw new ApolloError(`${error.message}`);
		}
	}

	@Mutation(() => User)
	async login(@Arg("input") input: UserLoginInput): Promise<any> {
		try {
			const userFound = await UserModel.findOne({ email: input.email }).select(
				"+password"
			);

			if (!userFound) throw new ApolloError("Credentials not found");

			const validPassword = await bcrypt.compare(
				input.password,
				userFound.password
			);

			console.log(validPassword);

			if (!validPassword) throw new ApolloError("Invalid Credentials");

			return userFound;
		} catch (error) {
			if (error instanceof Error) throw new ApolloError(`${error.message}`);
		}
	}
}
