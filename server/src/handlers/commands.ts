import path from 'path';
import { readdirSync } from 'fs';

export default async (client: ClientType): Promise<void> => {
	const load = (dir: string) => {
		const commands = readdirSync(path.join(__dirname, '..', 'commands', dir));

		commands.forEach(async (file) => {
			const command = await import(`../commands/${dir}/${file}`);

			client.commands.set(command.default.config.tag, command);
		});
	};
	['info'].forEach((i) => load(i));
};
