import { MessageEmbed } from 'discord.js';
import env from '../../../config/enviroment';

export default {
	config: {
		tag: 'help',
		description: 'Return all my commands',
	},
	run: async (client, message, args): Promise<void> => {
		const { prefix } = env;
		const embed = new MessageEmbed();
		const type = args?.join().trim();

		const group = [] as { dir: string; tag: string; description: string }[];
		const clientCommands = client.commands as CollectionType[];

		clientCommands.forEach((cmd) => {
			group.push({
				dir: cmd.info.dir,
				tag: cmd.info.command.config.tag,
				description: cmd.info.command.config.description,
			});
		});

		if (type?.length === 0) {
			const formatedEmbed = [] as string[];
			let embedDescription = '';

			group.forEach((item) => {
				if (!formatedEmbed.find((x) => x === item.dir)) {
					formatedEmbed.push(item.dir);
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
					embed.addField(`${prefix}${item.tag}`, item.description || '\u200b');
				});
				embed.setTitle(`Available commands for ${type?.toUpperCase()}`);
			} else {
				const availableGroups = [] as string[];
				let embedDescription =
					'⁉ This command group does not exist!\n\n**Available groups:**\n';

				group.forEach((item) => {
					if (!availableGroups.find((x) => x === item.dir)) {
						availableGroups.push(item.dir);
					}
				});

				availableGroups.forEach((x) => {
					embedDescription += `!help ${x}\n`;
				});

				embed.setDescription(embedDescription);
			}
		}

		message.channel.send(embed);
	},
} as CommandType;
