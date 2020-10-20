import { Client, MessageEmbed } from 'discord.js';

export default async (client: Client): Promise<MessageEmbed> => {
	const admin = await client.users.fetch('426609168217276417');

	return new MessageEmbed().setDescription(`
		Houve um erro na busca, tente novamente mais tarde.\nCaso o erro persista entre em contato com o desenvolvedor:\n\nDiscord: [${admin.tag}](https://discordapp.com/users/${admin.id})\nTwitter: [@johncovv](https://twitter.com/johncovv)`);
};
