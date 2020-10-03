import { Message } from 'discord.js';

import env from '../../../config/enviroment';

export default (client: ClientType, message: Message): void => {
	if (message.author.bot) return;
	if (!message.guild) return;

	const { id } = message.guild;

	const guildsArray = client.guildsCollection as GuildType[];

	const exist = guildsArray.find(
		(guild) => guild.guildId === parseInt(id, 10),
	) as GuildType;

	const prefix = exist.config.prefix || env.prefix;

	if (!message.content.startsWith(prefix)) return;

	const args = message.content.slice(prefix.length).trim().split(/\s/g);

	const command = args.shift()?.toLowerCase();

	if (command?.length === 0) return;

	const commandFile = client.commands.get(command);

	if (commandFile) commandFile.info.command.run(client, message, args);
};
