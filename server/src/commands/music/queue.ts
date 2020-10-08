/* eslint-disable no-restricted-syntax */
import { Guild, MessageEmbed } from 'discord.js';

import { queueCollection } from '../../utils/playSong';

export default {
	config: {
		tag: 'queue',
		description: 'Shows queue songs.',
		permissions: ['SEND_MESSAGES'],
	},
	run: async (client, message, args): Promise<void> => {
		const guild = message.guild as Guild;

		const guildQueue = queueCollection.get(guild.id);

		if (!guildQueue || !guildQueue.songs) {
			message.channel.send(
				new MessageEmbed().setDescription('There is no music in the queue.'),
			);
			return;
		}

		const arg = args?.join().trim();

		const queueSongs = guildQueue.songs;

		let embedDescription = '\n';

		const tabs = Math.ceil(queueSongs.length / 10);

		for (const [index, song] of queueSongs.entries()) {
			const position = index + 1;

			if (arg) {
				const argTab = parseInt(arg, 10);

				if (!isNaN(argTab)) {
					if (argTab <= tabs && argTab > 0) {
						if (position <= argTab * 10 && position > (argTab - 1) * 10) {
							embedDescription += `${position} - [${song.title}](${song.url})\n\n`;
						}
					} else {
						message.channel.send(
							new MessageEmbed().setDescription(
								`Escolha um número entre [1 - ${tabs}]`,
							),
						);
						return;
					}
				} else {
					message.channel.send(
						new MessageEmbed().setDescription(
							'Please send a valid value (number)!',
						),
					);
					return;
				}
			} else {
				if (position > 10) break;

				embedDescription += `${position} - [${song.title}](${song.url})\n\n`;
			}
		}

		const embed = new MessageEmbed()
			.setTitle('🎵 Songs in the playlist!')
			.setDescription(embedDescription);

		embed.setFooter(
			`${arg || 1}/${tabs} tab. ${queueSongs.length} song on the queue.`,
			client.user?.avatarURL() || '',
		);

		message.channel.send(embed);
	},
} as CommandType;
