import guildController from '../../controllers/GruildController';

export default (client: ClientType): void => {
	const { user } = client;

	if (user) {
		user.setPresence({
			status: 'online',
			activity: {
				type: 'WATCHING',
				name: 'johncovv.com',
				url: 'https://johncovv.com',
			},
		});
	}

	const guildsCacheArray = client.guilds.cache;

	guildsCacheArray.forEach(async (guild) => {
		const exist = await guildController.find(guild.id);

		if (!exist) {
			guildController.register(guild);
		}
	});

	// eslint-disable-next-line no-console
	console.log(`✔ Logged in as ${client.user?.tag}!`);
};
