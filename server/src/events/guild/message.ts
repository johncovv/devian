import { Message, BitFieldResolvable, PermissionString } from 'discord.js';

import env from '../../../config/enviroment';

export default (client: ClientType, message: Message): void => {
	if (message.author.bot) return;
	if (!message.guild) return;

	const { guild } = message;

	// fetch the settings of the server that the command was executed
	const guildsArray = client.guildsCollection as GuildType[];
	const exist = guildsArray.find(
		(x) => x.guildId === parseInt(guild.id, 10),
	) as GuildType;

	// set the prefix
	const prefix = exist.config.prefix || env.prefix;

	// checks if the message starts with the prefix
	if (!message.content.startsWith(prefix)) return;

	// checks if the user sent any commands
	const args = message.content.slice(prefix.length).trim().split(/\s/g);
	const command = args.shift()?.toLowerCase();
	if (command?.length === 0) return;

	// if the user has sent a command, searches in the collection
	const commandFile = client.commands.get(command);

	if (!commandFile) return;

	// checks if the user has the permissions required by the command
	const permissions = commandFile.info.command.config
		.permissions as BitFieldResolvable<PermissionString>[];

	if (permissions) {
		// eslint-disable-next-line no-restricted-syntax
		for (const permission of permissions) {
			if (!message.member?.hasPermission(permission)) {
				message.delete();
				return;
			}
		}
	}

	// if the command is found, execute the command
	if (commandFile) commandFile.info.command.run(client, message, args, prefix);
};
