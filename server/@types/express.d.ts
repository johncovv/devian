declare namespace Express {
	export interface Request {
		clientData: {
			guilds?: GuildType[];
			commands?: CollectionType[];
		};
	}
}
