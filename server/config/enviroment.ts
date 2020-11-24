import dotenv from 'dotenv';

dotenv.config();

export default {
	isDev: !!(!process.env.NODE_ENV || process.env.NODE_ENV === 'development'),
	port: process.env.PORT || '3000',
	token: process.env.DISCORD_TOKEN || '',
	discord_id: process.env.DISCORD_ID || '',
	prefix: process.env.DISCORD_PREFIX || 'd!',
	mongoUrl: process.env.MONGO_URL || '',
	animeBaseUrl: process.env.ANIME_BASE_URL || '',
	youtubeKey: process.env.YOUTUBE_KEY || '',
	riotToken: process.env.RIOT_TOKEN || '',
};
