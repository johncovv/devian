import { Guild, MessageEmbed } from 'discord.js';
import { queueCollection } from '../../utils/playSong';

export default {
	config: {
		tag: 'stop',
		description: 'Clear the playlist and leave the voice channel.',
		permissions: ['SEND_MESSAGES'],
	},
	run: async (client, message): Promise<void> => {
		const guild = message.guild as Guild;

		const queueGuild = queueCollection.get(guild.id);

		if (queueGuild) {
			const { voiceChannel } = queueGuild;

			if (voiceChannel) {
				const { member } = message;

				if (member) {
					const { channel } = member.voice;

					if (channel) {
						if (channel.id === voiceChannel.id) {
							voiceChannel.leave();
							queueCollection.delete(guild.id);

							message.channel.send(
								new MessageEmbed().setDescription(
									`🚮 the playlist was cleared by **${message.author.username}**`,
								),
							);
							return;
						}
					}
				}

				message.reply(
					new MessageEmbed().setDescription(
						'You need to be connected to the voice channel to use this command!',
					),
				);
			}
		}
	},
} as CommandType;
