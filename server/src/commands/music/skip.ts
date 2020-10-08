import { Guild, MessageEmbed } from 'discord.js';

import { queueCollection, playMusic } from '../../utils/playSong';

export default {
	config: {
		tag: 'skip',
		description: 'Skip the current song from the queue.',
		permissions: ['SEND_MESSAGES'],
	},
	run: async (client, message, args): Promise<void> => {
		const guild = message.guild as Guild;

		const guildQueue = queueCollection.get(guild.id);

		if (!guildQueue) {
			message.channel.send(
				new MessageEmbed().setDescription('There is no music to skip!'),
			);
			return;
		}

		const arg = args?.join().trim();

		const { username } = message.author;

		if (arg) {
			const numberToSkip = parseInt(arg, 10);

			if (arg.length > 0 && !isNaN(numberToSkip)) {
				guildQueue.songs.splice(0, numberToSkip);

				const nextSong = guildQueue.songs[0];

				playMusic(guild, nextSong);

				if (guildQueue.songs.length > 0) {
					message.channel.send(
						new MessageEmbed().setDescription(
							`${username} skipped ${numberToSkip} songs.\nNow playing: [${nextSong.title}](${nextSong.url}).`,
						),
					);
					return;
				}

				message.channel.send(
					new MessageEmbed().setDescription(
						"There is no more music in the queue. I'm leaving 👋",
					),
				);
				return;
			}
		}

		// remover música atual
		guildQueue.songs.splice(0, 1);

		const nextSong = guildQueue.songs[0];

		playMusic(guild, nextSong);

		if (guildQueue.songs.length > 0) {
			message.channel.send(
				new MessageEmbed().setDescription(
					`${username} skipped the song.\nNow playing: [${nextSong.title}](${nextSong.url}).`,
				),
			);
			return;
		}

		message.channel.send(
			new MessageEmbed().setDescription(
				`There is no music in the queue. I'm leaving 👋`,
			),
		);
	},
} as CommandType;
