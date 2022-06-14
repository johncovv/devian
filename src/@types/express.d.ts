declare namespace Express {
	export interface Request {
		client: import('discord.js').Client;
	}
}
