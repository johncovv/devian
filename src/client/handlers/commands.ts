import { Client } from 'discord.js';
import path from 'path';
import fs from 'fs';

/**
 * Register all commands founded on src/client/commands folder
 *
 * @param {Client} client - Discord {@link Client client} instance
 */
export async function registerCommands(client: Client) {
	const foldersList = await fs.readdirSync(path.resolve(__dirname, '..', 'commands'));

	for (const dir of foldersList) {
		const filesList = await fs.readdirSync(path.resolve(__dirname, '..', 'commands', dir));

		for (const file of filesList) {
			const { default: command } = <{ default: CommandType }>await import(`../commands/${dir}/${file}`);

			client.commands.set(command.config.id, { command, category: dir });
		}
	}
}
