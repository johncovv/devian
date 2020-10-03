import { Guild, MessageEmbed } from 'discord.js';
import guildController from '../../controllers/GuildController';

export default async (client: ClientType, guild: Guild): Promise<void> => {
	const exist = await guildController.find(guild.id);

	if (!exist) {
		const register = await guildController.register(guild);

		const embed = new MessageEmbed();
		const guildOwner = client.users.cache.get(guild.ownerID);
		const admin = await client.users.fetch('426609168217276417');

		if (admin) {
			embed.setAuthor(
				admin.username,
				`https://cdn.discordapp.com/avatars/${admin.id}/${admin.avatar}.png?size=128`,
				`https://discordapp.com/users/${admin.id}`,
			);
		}

		if (register) {
			if (guildOwner) {
				guildOwner.send(
					embed.setDescription(
						`\nHello, thanks for adding Devian bot, if there is any error or performance loss, please contact me.\n\nDiscord: [John Covv#8639](https://discordapp.com/users/426609168217276417)\nTwitter: [@johncovv](https://twitter.com/johncovv)`,
					),
				);
			}
		} else if (!register) {
			if (guildOwner) {
				guildOwner.send(
					embed.setDescription(
						`\nThere was a problem trying to register your server, please try to add the bot again, if the problem persists, please contact me.\n\nDiscord: [John Covv#8639](https://discordapp.com/users/426609168217276417)\nTwitter: [@johncovv](https://twitter.com/johncovv)`,
					),
				);
			}
		}
	}
};
