import guildController from '../../controllers/GuildController';

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
			const registered = await guildController.register(guild);

			if (registered) {
				client.guildsCollection.set(registered._id, registered);
			}
		} else {
			client.guildsCollection.set(exist._id, exist);
		}
	});

	// eslint-disable-next-line no-console
	console.log(`✔ Logged in as ${client.user?.tag}!`);
};
