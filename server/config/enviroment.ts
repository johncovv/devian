import dotenv from 'dotenv';

dotenv.config();

export default {
	isDev: !!(!process.env.NODE_ENV || process.env.NODE_ENV === 'development'),
	token: process.env.DISCORD_TOKEN,
	prefix: process.env.DISCORD_PREFIX || '.',
};
