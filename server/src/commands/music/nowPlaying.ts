import { Guild, MessageEmbed } from 'discord.js';

import ytdl from 'ytdl-core';

import { queueCollection } from '../../utils/playSong';
import msToTime from '../../utils/msToTime';

const concatTime = (current: number, total: number): string => {
	return `${msToTime(current)} / ${msToTime(total)}`;
};

export default {
	config: {
		tag: 'np',
		description: 'Shows the current song.',
		permissions: ['SEND_MESSAGES'],
	},
	run: async (client, message): Promise<void> => {
		const guild = message.guild as Guild;

		const guildQueue = queueCollection.get(guild.id);

		if (!guildQueue) {
			message.channel.send(
				new MessageEmbed().setDescription(
					'❓ There is no song in the playlist!',
				),
			);
			return;
		}

		if (!guildQueue.connection) return;

		const currentSong = guildQueue.songs[0];

		if (currentSong.duration === 0) {
			const songSearch = await ytdl.getBasicInfo(currentSong.url);

			currentSong.duration = parseInt(
				songSearch.videoDetails.lengthSeconds,
				10,
			);
		}

		const currentTime = guildQueue.connection.dispatcher.streamTime;

		const embed = new MessageEmbed()
			.setImage(currentSong.thumbnail)
			.setDescription(
				`**Current Music:**\n\nTitle: [${currentSong.title}](${
					currentSong.url
				}&t=${Math.trunc(currentTime / 1000)})\n\nCurrent time: [${concatTime(
					currentTime,
					currentSong.duration * 1000,
				)}](${currentSong.url}&t=${Math.trunc(currentTime / 1000)})`,
			);

		message.channel.send(embed);
	},
} as CommandType;
