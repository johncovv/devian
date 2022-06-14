import { Client, Message, MessageEmbed } from 'discord.js';

export default <CommandType>{
	config: {
		id: 'ping',
		description: 'Reports bot latency',
	},
	async exec(client: Client, message: Message, _args?: Array<string>): Promise<void> {
		const embed = new MessageEmbed();

		const messageInstance = await message.channel.send({ embeds: [embed.setDescription('Pinging...')] });

		const latency = new Date(messageInstance.createdAt).getTime() - new Date(message.createdAt).getTime();

		const pongMessage = `
			🏓 Pong!

			Latency: **${client.ws.ping}ms**
			API Latency: **${latency}ms**
		`;

		messageInstance.edit({
			embeds: [embed.setDescription(pongMessage)],
		});
	},
};
