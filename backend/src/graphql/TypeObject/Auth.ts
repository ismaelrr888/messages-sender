import { ObjectType, Field, InputType } from "type-graphql";
import { MaxLength } from "class-validator";

@ObjectType()
export class User {
	@Field()
	name?: string;
	@Field()
	email!: string;
	@Field()
	password!: string;
}

@InputType()
export class UserInput {
	@Field()
	@MaxLength(30)
	name?: string;
	@Field()
	@MaxLength(30)
	email!: string;
	@Field()
	@MaxLength(30)
	password!: string;
}

@InputType()
export class UserLoginInput {
	@Field()
	@MaxLength(30)
	email!: string;
	@Field()
	@MaxLength(30)
	password!: string;
}
