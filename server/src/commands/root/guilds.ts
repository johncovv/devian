import { MessageEmbed, Message } from 'discord.js';

export default {
	config: {
		tag: 'guilds',
		description: 'List all registered guilds.',
		permissions: ['ADMINISTRATOR'],
	},
	run: async (client, message): Promise<Message | void> => {
		const allGuilds = client.guildsCollection.array() as GuildType[];

		const embed = new MessageEmbed().setTitle('Active guilds:');

		let description = '\n';

		allGuilds.forEach(({ guildId, name, config }) => {
			description += `**${name}** (${guildId}) **${config.language.toUpperCase()}**.\n`;
		});

		embed.setDescription(description);

		return message.channel.send(embed);
	},
} as CommandType;
