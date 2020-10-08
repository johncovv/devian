import { Guild, MessageEmbed } from 'discord.js';
import { queueCollection } from '../../utils/playSong';

export default {
	config: {
		tag: 'volume',
		description: 'Changes the volume of songs between 0% and 200%.',
		permissions: ['SEND_MESSAGES'],
	},
	run: async (client, message, args): Promise<void> => {
		const guild = message.guild as Guild;

		const queueGuild = queueCollection.get(guild.id);

		if (queueGuild) {
			const arg = args?.join().trim();

			const { connection } = queueGuild;

			if (connection) {
				if (!arg) {
					message.channel.send(
						new MessageEmbed().setDescription(
							`🔊 Volume: ${connection.dispatcher.volume * 100}%`,
						),
					);
					return;
				}

				const param = parseInt(arg, 10);

				if (isNaN(param)) {
					message.channel.send(
						new MessageEmbed().setDescription(
							`Send a valid amount (number between 0 - 200).`,
						),
					);
					return;
				}

				if (param >= 0 && param <= 200) {
					const volumeParsed = param / 100;

					connection.dispatcher.setVolume(volumeParsed);

					message.channel.send(
						new MessageEmbed()
							.setDescription(
								`🔊 Volume changed to: ${connection.dispatcher.volume * 100}%`,
							)
							.setFooter(
								`Changed by: ${message.author.username}`,
								message.author.avatarURL() || '',
							),
					);
				} else {
					message.channel.send(
						new MessageEmbed().setDescription(
							`🔊 The volume must be between 0 and 200!`,
						),
					);
				}
			}
		}
	},
} as CommandType;
