/* eslint-disable prefer-const */
import path from 'path';
import { readdirSync } from 'fs';

export default async (client: ClientType): Promise<void> => {
	const load = async (dir: string) => {
		const commands = readdirSync(path.join(__dirname, '..', 'commands', dir));

		commands.forEach(async (file) => {
			const command = await import(`../commands/${dir}/${file}`);

			client.commands.set(command.default.config.tag, {
				info: { command: command.default, dir },
			});
		});
	};
	[
		'info',
		'moderation',
		'administration',
		'entertainment',
		'music',
	].forEach((x) => load(x));
};
