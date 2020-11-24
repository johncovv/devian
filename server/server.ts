import { Client, Collection } from 'discord.js';
import express from 'express';
import cors from 'cors';

import requireDir from 'require-dir';
import colors from 'colors';
import path from 'path';

import commandsHandler from './src/handlers/commands';
import eventsHandler from './src/handlers/events';

import './config/database';

import clientRoutes from './src/routes/client';
import userRoutes from './src/routes/user';

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

const app = express();

app.use(express.json());

app.use(cors());

app.use('/api', (req, res, next) => {
	req.clientData = {
		guilds: client.guildsCollection.array(),
		commands: client.commands.array(),
	};

	next();
});

app.use('/api/client', clientRoutes);

app.use('/api', userRoutes);

const { port } = env;

app.listen(port, () =>
	// eslint-disable-next-line no-console
	console.log(colors.bgGreen.black(`\n🚀 Server started on port: ${port}`)),
);
