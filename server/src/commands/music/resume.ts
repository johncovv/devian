import { Guild, MessageEmbed } from 'discord.js';
import { queueCollection } from '../../utils/playSong';

export default {
	config: {
		tag: 'resume',
		description: 'Play the playlist again.',
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

		if (queueGuild.playing === true) {
			message.channel.send(
				new MessageEmbed().setDescription(
					'😅 The current song is already playing.',
				),
			);
			return;
		}

		const { connection } = queueGuild;

		if (!connection) return;

		connection.dispatcher.resume();
		queueGuild.playing = true;

		message.channel.send(
			new MessageEmbed().setDescription(
				`▶ **${message.author.username}** gave play again in the playlist.\n\nType **${prefix}pause** to pause.`,
			),
		);
	},
} as CommandType;
