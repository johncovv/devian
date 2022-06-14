import { Client } from 'discord.js';

import env from '@config/env';

/**
 * Setting client events listerner and executions
 *
 * @param {Client} client - Discord {@link Client client} instance
 */
export function eventsHandler(client: Client) {
	client.on('ready', async () => {
		const info = [];

		const { client: envClient } = env;

		info.push(`Client Token: ${envClient.token}`);
		info.push(`Client Prefix: ${envClient.prefix}`);
		info.push('----------\n');

		console.info(info.join('\n'));
	});
}
