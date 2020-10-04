import { MessageEmbed } from 'discord.js';
import guildController from '../../controllers/GuildController';

export default {
	config: {
		tag: 'devian-set-prefix',
		description: 'Set prefix from Devian bot!',
		permissions: ['ADMINISTRATOR'],
	},
	run: async (client, message, args): Promise<void> => {
		const arg = args?.join().trim();

		const guildsCollection = client.guildsCollection as GuildType[];

		if (!message.guild) return;

		const { guild } = message;

		const existGuild = guildsCollection.find(
			(x) => x.guildId === parseInt(guild.id, 10),
		) as GuildType;

		const embed = new MessageEmbed();

		if (arg?.length === 0) {
			embed.setDescription(
				`**No prefix assigned!**\n\nExample of use: **${existGuild?.config.prefix}devian-set-prefix D!**`,
			);
		} else if (arg) {
			const { _id, guildId, name, icon, config } = existGuild;

			const updated = await guildController.update({
				_id,
				guildId,
				name,
				icon,
				config: { language: config.language, prefix: arg },
			});

			if (updated) {
				embed.setDescription(
					`The prefix has been changed to **${arg}**\n\nChange made by: **${message.author.username}**`,
				);

				const guildsList = client.guildsCollection as GuildType[];

				const exist = guildsList.find((x) => x.guildId === guildId);

				if (exist) {
					exist.config.prefix = arg;
				}
			}
		}

		message.channel.send(embed);
	},
} as CommandType;
