/* eslint-disable no-restricted-syntax */
import {
	BitFieldResolvable,
	MessageEmbed,
	PermissionString,
	GuildMember,
} from 'discord.js';

interface HelpGroupType {
	dir: string;
	tag: string;
	description: string;
	permissions?: BitFieldResolvable<PermissionString>[];
}

const verifyPermission = (
	command: HelpGroupType,
	member: GuildMember | null,
): boolean => {
	const permissions = command.permissions as BitFieldResolvable<
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
	run: async (client, message, args): Promise<void> => {
		if (!message.guild) return;

		const type = args?.join().trim();
		const embed = new MessageEmbed();

		// get guild from collection
		const { guild } = message;
		const guildsArray = client.guildsCollection as GuildType[];
		const guildExist = guildsArray.find(
			(x) => x.guildId === parseInt(guild.id, 10),
		) as GuildType;

		// set prefix
		const { prefix } = guildExist.config;

		const group = [] as HelpGroupType[];
		const clientCommands = client.commands as CollectionType[];

		clientCommands.forEach((cmd) => {
			group.push({
				dir: cmd.info.dir,
				tag: cmd.info.command.config.tag,
				description: cmd.info.command.config.description,
				permissions: cmd.info.command.config.permissions,
			});
		});

		if (type?.length === 0) {
			const formatedEmbed = [] as string[];
			let embedDescription = '';

			group.forEach((item) => {
				const haveAllPermissions = verifyPermission(item, message.member);

				if (haveAllPermissions) {
					if (!formatedEmbed.find((x) => x === item.dir)) {
						formatedEmbed.push(item.dir);
					}
				}
			});

			formatedEmbed.forEach((x) => {
				embedDescription += `${prefix}help ${x}\n`;
			});

			embed
				.setTitle('Available command types')
				.setDescription(embedDescription);
		} else {
			const exist = group.filter((item) => item.dir === type);

			if (exist.length > 0) {
				exist.forEach((item) => {
					const haveAllPermissions = verifyPermission(item, message.member);

					if (haveAllPermissions) {
						embed.addField(
							`${prefix}${item.tag}`,
							item.description || '\u200b',
						);
						embed.setTitle(`Available commands for ${type?.toUpperCase()}`);
					} else {
						embed.setDescription(
							`⛔ You do not have the correct permissions to use this command!`,
						);
					}
				});
			} else {
				const availableGroups = [] as string[];
				let embedDescription =
					'⁉ This command group does not exist!\n\n**Available groups:**\n';

				group.forEach((item) => {
					const haveAllPermissions = verifyPermission(item, message.member);

					if (haveAllPermissions) {
						if (!availableGroups.find((x) => x === item.dir)) {
							availableGroups.push(item.dir);
						}
					}
				});

				availableGroups.forEach((x) => {
					embedDescription += `${prefix}help ${x}\n`;
				});

				embed.setDescription(embedDescription);
			}
		}

		message.author.send(embed);
	},
} as CommandType;
