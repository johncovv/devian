import { Client } from 'discord.js';

import env from '@config/env';

/**
 * Find command by id or try to find by aliases
 *
 * @param {Object.<string, any>} params
 * @param {Client} params.client - Discord client instance
 * @param {string} params.id - Command id
 * @return {{command: CommandType, category: string} | null} command and category or null
 */
function findCommand(params: { client: Client; id: string }): { command: CommandType; category: string } | null {
	const { id, client } = params;

	return (
		client.commands.get(id) ??
		client.commands.find((c) => !!c.command.config.alias?.some((alias) => alias.match(new RegExp(id, 'i')))) ??
		null
	);
}

/**
 * Setting client events listerner and executions
 *
 * @param {Client} client - Discord {@link Client client} instance
 */
export function eventsHandler(client: Client) {
	client.on('messageCreate', (message) => {
		if (!message.content.startsWith(env.client.prefix)) return;

		const [id, ...args] = message.content.slice(1).trim().split(/\s/g);

		const targetCommand = findCommand({ client, id });

		if (!targetCommand) return;

		targetCommand.command.exec(client, message, args);
	});

	client.on('ready', async () => {
		const info = [];

		const { client: envClient } = env;

		info.push(`Client Token: ${envClient.token}`);
		info.push(`Client Prefix: ${envClient.prefix}`);
		info.push('----------\n');

		console.info(info.join('\n'));
	});
}
