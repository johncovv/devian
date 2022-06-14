import { Client, Message } from 'discord.js';

declare global {
	export interface CommandType {
		config: {
			id: string;
			description: string;
			alias?: Array<string>;
		};
		exec: (client: Client, message: Message, args?: Array<string>) => Promise<unknown>;
	}
}
