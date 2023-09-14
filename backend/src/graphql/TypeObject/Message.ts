import { ObjectType, Field, InputType } from "type-graphql";
import { MaxLength } from "class-validator";

@ObjectType()
class Language {
	@Field()
	code!: string;
}

@ObjectType()
class Template {
	@Field()
	name!: string;

	@Field(() => Language)
	language!: Language;
}

@ObjectType()
export class Message {
	@Field()
	messaging_product!: string;

	@Field()
	to!: string;

	@Field()
	type!: string;

	@Field((type) => Template)
	template!: Template;
}

@InputType()
class LanguageInput {
	@Field()
	code!: string;
}

@InputType()
class TemplateInput {
	@Field()
	name!: string;

	@Field((type) => LanguageInput)
	language!: LanguageInput;
}

@InputType()
export class MessageInput {
	@Field()
	@MaxLength(30)
	messaging_product!: string;

	@Field()
	@MaxLength(30)
	to!: string;

	@Field()
	@MaxLength(30)
	type!: string;

	@Field((type) => TemplateInput)
	template!: TemplateInput;
}
