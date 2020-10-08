import { Guild, MessageEmbed } from 'discord.js';
import { queueCollection } from '../../utils/playSong';

export default {
	config: {
		tag: 'pause',
		description: 'Pause music playback.',
		permissions: ['SEND_MESSAGES'],
	},
	run: async (client, message, args, prefix): Promise<void> => {
		const guild = message.guild as Guild;

		const queueGuild = queueCollection.get(guild.id);

		if (!queueGuild) {
			message.channel.send(
				new MessageEmbed().setDescription(
					'😅 There is no playlist being played!',
				),
			);
			return;
		}

		if (queueGuild.playing === false) {
			message.channel.send(
				new MessageEmbed().setDescription(
					'😅 The current song is already paused!',
				),
			);
			return;
		}

		const { connection } = queueGuild;

		if (!connection) return;

		connection.dispatcher.pause();

		queueGuild.playing = false;

		message.channel.send(
			new MessageEmbed().setDescription(
				`⏸ The music was paused by **${message.author.username}**.\n\nType **${prefix}resume** to play.`,
			),
		);
	},
} as CommandType;
