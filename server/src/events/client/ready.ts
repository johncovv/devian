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

	// eslint-disable-next-line no-console
	console.log(`✔ Logged in as ${client.user?.tag}!`);
};
