import { Client, Intents, Collection } from 'discord.js';

import { registerCommands } from '@client/handlers/commands';
import { eventsHandler } from '@client/handlers/events';
import env from '@config/env';

/**
 * Discord client object
 */
class DiscordClient {
	private client: Client;

	/**
	 * Create a discord client instance and save it in DiscordClient.client
	 */
	constructor() {
		this.client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
	}

	/**
	 * Initiate the Client & Create a command's collection & Register events handler
	 *
	 * @return {Client} Return the instance of Discord client
	 */
	public starts(): Client {
		this.client.login(env.client.token);

		this.client.commands = new Collection();

		registerCommands(this.client);
		eventsHandler(this.client);

		return this.client;
	}
}

export { DiscordClient };
