import { Client, Collection } from 'discord.js';

import commandsHandler from './src/handlers/commands';

// config
import env from './config/enviroment';

import eventsHandler from './src/handlers/events';

// client
const client = new Client({ disableMentions: 'all' }) as ClientType;

client.commands = new Collection();

eventsHandler(client);
commandsHandler(client);

const { token } = env;
client.login(token);
