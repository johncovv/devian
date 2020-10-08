declare namespace MusicCommand {
	export interface SongType {
		title: string;
		url: string;
		duration: number;
		thumbnail: string;
	}

	export interface QueueConstructType {
		textChannel: Channel;
		voiceChannel: import('discord.js').VoiceChannel;
		connection?: import('discord.js').VoiceConnection;
		songs: MusicCommand.SongType[];
		playing: boolean;
	}
}
