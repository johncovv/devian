import dotenv from 'dotenv';
import path from 'path';

/* using machine enviroment */
dotenv.config({ path: path.resolve(__dirname, '..', '..', '..', `.env`) });

const app = {
	name: process.env.npm_package_name,
	version: process.env.npm_package_version,
};

const server = {
	port: process.env.PORT ?? 3000,
	host: process.env.HOST ?? 'localhost',
};

const client = {
	token: process.env.CLIENT_TOKEN!,
	prefix: process.env.CLIENT_PREFIX ?? 'd!',
};

export default { server, client, app };
