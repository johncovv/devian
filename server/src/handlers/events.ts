export default (client: ClientType): void => {
	client.on('message', async (msg) => {
		const messageEvent = await import('../events/guild/message');

		messageEvent.default(client, msg);
	});

	client.on('ready', async () => {
		const readyEvent = await import('../events/client/ready');

		readyEvent.default(client);
	});
};
