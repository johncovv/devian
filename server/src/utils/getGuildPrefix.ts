import { Message } from 'discord.js';

export default (client: ClientType, message: Message): string => {
	// get guild from collection
	const { guild } = message;

	if (guild) {
		const guildsArray = client.guildsCollection as GuildType[];
		const guildExist = guildsArray.find(
			(x) => x.guildId === parseInt(guild.id, 10),
		) as GuildType;

		// set prefix
		const { prefix } = guildExist.config;

		return prefix;
	}
	return '';
};
