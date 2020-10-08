/* eslint-disable no-console */
import ytdl from 'ytdl-core';
import { Guild } from 'discord.js';

export const queueCollection = new Map() as Map<
	string,
	MusicCommand.QueueConstructType
>;

export const playMusic = async (
	guild: Guild,
	song: MusicCommand.SongType,
): Promise<void> => {
	const serverQueue = queueCollection.get(guild.id);

	if (!serverQueue) return;

	if (!song) {
		queueCollection.delete(guild.id);
		serverQueue.voiceChannel.leave();
		return;
	}

	const stream = ytdl(song.url, {
		filter: 'audioonly',
		liveBuffer: 3000,
		quality: 'lowest',
		highWaterMark: 8000,
	});

	if (!serverQueue.connection) return;

	const dispatcher = serverQueue.connection.play(stream);

	dispatcher
		.on('finish', () => {
			serverQueue.songs.shift();
			playMusic(guild, serverQueue.songs[0]);
		})
		.on('error', (error) => {
			serverQueue.songs.shift();
			playMusic(guild, serverQueue.songs[0]);
			console.log('❌ ffmpeg error: ', error);
		});
};
