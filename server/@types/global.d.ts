/* eslint-disable no-use-before-define */
import {
	Client,
	Collection,
	Message,
	PermissionString,
	BitFieldResolvable,
} from 'discord.js';

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			DISCORD_TOKEN: string;
			NODE_ENV: string;
			DISCORD_PREFIX: string;
			MONGO_URL: string;
			ANIME_BASE_URL: string;
			YOUTUBE_KEY: string;
			PORT: string;
		}
	}

	interface CommandType {
		config: {
			tag: string;
			alias?: [string];
			description: string;
			permissions?: BitFieldResolvable<PermissionString>[];
		};
		run: (
			client: ClientType,
			message: Message,
			args?: [string],
			prefix: string,
		) => Promise<Message> | Promise<void> | void;
	}

	interface GuildType {
		_id: string;
		guildId: id;
		name: string;
		icon: string;
		config: {
			prefix: string;
			language: 'pt-br' | 'en-us';
		};
	}

	interface CollectionType {
		key: string;
		info: { command: CommandType; dir: string };
	}

	interface GuildsCollection {
		id: number;
		guild: GuildType;
	}

	interface ClientType extends Client {
		commands: Collection<CollectionType>;
		guildsCollection: Collection<GuildsCollection>;
	}
}

export {};
