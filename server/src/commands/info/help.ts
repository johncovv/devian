/* eslint-disable no-restricted-syntax */
import {
	BitFieldResolvable,
	MessageEmbed,
	PermissionString,
	GuildMember,
} from 'discord.js';

const verifyPermission = (
	command: CommandType,
	member: GuildMember | null,
): boolean => {
	const permissions = command.config.permissions as BitFieldResolvable<
		PermissionString
	>[];

	if (permissions) {
		for (const perm of permissions) {
			if (member?.hasPermission(perm)) {
				return true;
			}
			return false;
		}
	}
	return true;
};

export default {
	config: {
		tag: 'help',
		description: 'Return all my commands',
		permissions: ['SEND_MESSAGES'],
	},
	run: async (client, message, args, prefix): Promise<void> => {
		if (!message.guild) return;

		const { member } = message;

		const arg = args?.join().trim().toLowerCase();

		const allCommands = client.commands as CollectionType[];

		if (!arg) {
			const groupOfCommands = [] as string[];

			allCommands.forEach((cmd) => {
				if (!groupOfCommands.find((x) => x === cmd.info.dir)) {
					groupOfCommands.push(cmd.info.dir);
				}
			});

			const commandsCollection = [] as {
				group: string;
				commands: CommandType[];
			}[];

			groupOfCommands.forEach((group) => {
				const localCommands = [] as CommandType[];
				allCommands.forEach((cmd) => {
					const hasPermission = verifyPermission(cmd.info.command, member);
					if (cmd.info.dir === group) {
						if (hasPermission) {
							localCommands.push(cmd.info.command);
						}
					}
				});

				if (localCommands.length > 0) {
					commandsCollection.push({ group, commands: localCommands });
				}
			});

			const embed = new MessageEmbed().setColor('#ffab00');

			commandsCollection.forEach((groupCollection) => {
				let fieldValue = '';

				groupCollection.commands.forEach((cmd, index) => {
					const position = index + 1;
					fieldValue += `\`${prefix}${cmd.config.tag}\`${
						position === groupCollection.commands.length ? '.' : ','
					} `;
				});

				embed.addField(groupCollection.group, fieldValue);
			});

			embed.setDescription(
				`**${message.guild.name.toUpperCase()}** commands that you have access to!`,
			);

			message.author.send(embed);
			message.reply(
				`I sent in your private the commands that you have access on this server!`,
			);
		} else {
			const exist = allCommands.find(
				(cmd) => cmd.info.command.config.tag === arg,
			);

			const commandEmbed = new MessageEmbed();

			if (exist && arg !== 'help') {
				const hasPermission = verifyPermission(exist.info.command, member);

				if (hasPermission) {
					const { tag, description } = exist.info.command.config;

					commandEmbed.addField(prefix + tag, description);

					message.author.send(commandEmbed);
					message.reply('I sent the command description in your private!');
					return;
				}
				message.channel.send(
					commandEmbed.setDescription(
						'You do not have the necessary permissions to use this command!',
					),
				);
				return;
			}

			message.channel.send(
				commandEmbed.setDescription('This command does not exist!'),
			);
		}
	},
} as CommandType;
