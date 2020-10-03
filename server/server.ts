import { Client, Collection } from 'discord.js';

import requireDir from 'require-dir';
import path from 'path';

import commandsHandler from './src/handlers/commands';
import eventsHandler from './src/handlers/events';

import './config/database';

// config
import env from './config/enviroment';

requireDir(path.join(__dirname, 'src', 'models'));

// client
const client = new Client({ disableMentions: 'all' }) as ClientType;

client.commands = new Collection();
client.guildsCollection = new Collection();

eventsHandler(client);
commandsHandler(client);

const { token } = env;
client.login(token);
