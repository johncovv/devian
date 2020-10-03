/* eslint-disable no-use-before-define */
import { Client, Collection, Message } from 'discord.js';

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			DISCORD_TOKEN: string;
			NODE_ENV: string;
			DISCORD_PREFIX: string;
		}
	}

	interface CommandType {
		config: {
			tag: string;
			alias?: [string];
			description: string;
		};
		run: (
			client: ClientType,
			message: Message,
			args?: [string],
		) => Promise<void> | void;
	}

	interface CollectionType {
		key: string;
		info: { command: CommandType; dir: string };
	}

	interface ClientType extends Client {
		commands: Collection<CollectionType>;
	}
}

export {};
