export interface IMessage {
	messaging_product: string;
	to: string;
	type: string;
	template: Template;
}

interface Template {
	name: string;
	language: Language;
}

interface Language {
	code: string;
}
