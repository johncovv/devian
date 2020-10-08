import { Guild, MessageEmbed } from 'discord.js';
import { queueCollection } from '../../utils/playSong';

export default {
	config: {
		tag: 'leave',
		description: 'Leave the voice channel and delete the playlist.',
		permissions: ['MANAGE_CHANNELS'],
	},
	run: async (client, message): Promise<void> => {
		const guild = message.guild as Guild;

		const queueGuild = queueCollection.get(guild.id);

		if (queueGuild) {
			queueCollection.delete(guild.id);
			queueGuild.voiceChannel.leave();
			message.channel.send(
				new MessageEmbed().setDescription('👋 Leaving the channel ...'),
			);
		} else {
			message.channel.send(
				new MessageEmbed().setDescription(
					'😅 There is no queue active on the server!',
				),
			);
		}
	},
} as CommandType;
