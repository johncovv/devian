import { MessageEmbed } from 'discord.js';

export default {
	config: {
		tag: 'clean',
		description:
			'Clears X (1 to 100) number of messages from the current channel!\nThe command cannot delete very old messages!',
		permissions: ['MANAGE_MESSAGES'],
	},
	run: async (client, message, args): Promise<void> => {
		const embed = new MessageEmbed();
		if (message.channel.type === 'dm') return;

		const amount = args?.join();

		if (amount) {
			const amountFormated = parseInt(amount, 10);

			// eslint-disable-next-line no-restricted-globals
			if (isNaN(amountFormated)) {
				message.reply(embed.setDescription('This is not a valid number!'));
				return;
			}

			if (amountFormated > 100) {
				message.reply(
					embed.setDescription(
						"❌ You can't delete more than 100 messages at once!",
					),
				);
				return;
			}
			if (amountFormated < 1) {
				message.reply(
					embed.setDescription('💬 You have to delete at least 1 message!'),
				);
				return;
			}

			const messagesChannel = await message.channel.messages.fetch({
				limit: amountFormated,
			});

			// delete messages and skip the 14 day filter
			message.channel.bulkDelete(messagesChannel, true);

			const response = await message.channel.send(
				embed.setDescription(
					`🚮 The channel was cleaned by **${message.author.username}**!`,
				),
			);

			response.delete({ timeout: 2000 });
		} else {
			message.reply(
				embed.setDescription(
					"❓ Yout haven't given an amount of messages wich should be deleted!",
				),
			);
		}
	},
} as CommandType;
