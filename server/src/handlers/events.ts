import readyEvent from '../events/client/ready';
import guildCreatedEvent from '../events/client/guildCreated';
import messageEvent from '../events/guild/message';

export default (client: ClientType): void => {
	client.on('message', (msg) => {
		messageEvent(client, msg);
	});

	client.on('guildCreate', async (guild) => {
		guildCreatedEvent(client, guild);
	});

	client.on('ready', async () => {
		readyEvent(client);
	});
};
