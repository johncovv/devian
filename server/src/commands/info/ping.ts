import { MessageEmbed } from 'discord.js';

export default {
	config: {
		tag: 'ping',
		description: 'Responds with bot latency!',
		permissions: ['SEND_MESSAGES'],
	},
	run: async (client, message): Promise<void> => {
		const embed = new MessageEmbed();

		const msgInstance = await message.channel.send(
			embed.setDescription('Pinging...'),
		);

		const latency =
			new Date(msgInstance.createdAt).getTime() -
			new Date(message.createdAt).getTime();

		msgInstance.edit(
			embed.setDescription(
				`🏓 Pong!\n\n Latency: ${client.ws.ping}ms\nAPI Latency: ${latency}ms`,
			),
		);
	},
} as CommandType;
