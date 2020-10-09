import { MessageEmbed, CollectorFilter } from 'discord.js';

import { YouTube } from 'popyt';

import ydtl from 'ytdl-core';

import { isYoutubeVideo, isYoutubePlaylist } from '../../utils/urlFilters';
import filterText from '../../utils/filterText';
import { playMusic, queueCollection } from '../../utils/playSong';
import msToTime from '../../utils/msToTime';

import env from '../../../config/enviroment';

const { youtubeKey } = env;

const youtubeSearch = new YouTube(youtubeKey, '', { cache: false });

export default {
	config: {
		tag: 'play',
		description:
			'Plays a youtube video on a voice channel.\nPossible to pass a URL of the video or playlist or even search for a video by passing the title.',
		permissions: ['SEND_MESSAGES', 'CONNECT'],
	},
	run: async (client, message, args): Promise<void> => {
		if (!message.guild) return;

		const arg = args?.join(' ').trim();

		// requests error message
		const admin = await client.users.fetch('426609168217276417');
		const requestErrorMessage = new MessageEmbed().setDescription(`
		There was an error in the search, please try again later.\nIf the error persists, contact the developer:\n\nDiscord: [${admin.tag}](https://discordapp.com/users/${admin.id})\nTwitter: [@johncovv](https://twitter.com/johncovv)`);

		if (!arg) {
			message.channel.send(
				new MessageEmbed().setDescription(
					'You need to send a Youtube link or a song title!',
				),
			);
			return;
		}

		const userVoiceChannel = message.member?.voice.channel;

		if (!userVoiceChannel) {
			message.channel.send(
				new MessageEmbed().setDescription(
					'You need to be connected to a voice channel to use this command!',
				),
			);
			return;
		}

		// url video
		let urlParam = arg;

		if (!isYoutubeVideo(urlParam)) {
			try {
				const response = await youtubeSearch.searchVideos(arg, 10);

				const searchVideoResults = response.results;

				if (searchVideoResults.length === 0) {
					message.channel.send(
						new MessageEmbed().setDescription(
							`No results found for **${arg}**`,
						),
					);
					return;
				}

				const searchVideoResultsEmbed = new MessageEmbed().setTitle(
					`**🎵 Please choose a number from [1 - ${searchVideoResults.length}]**`,
				);

				let embedDescription = '';

				searchVideoResults.forEach((video, index) => {
					const title = filterText(video.title);
					const position = index + 1;

					embedDescription += `[${position}] - [${title}](${video.url})\n\n`;
				});

				searchVideoResultsEmbed
					.setDescription(`${embedDescription}or type **cancel**`)
					.setFooter('Maximum response time is 10 seconds!');

				message.channel.send(searchVideoResultsEmbed);

				try {
					const filter: CollectorFilter = (m) =>
						m.author.id === message.author.id;

					const collectAnswer = await message.channel.awaitMessages(filter, {
						max: 1,
						time: 10000,
					});

					const userReply = collectAnswer.first()?.content;

					if (userReply) {
						if (userReply === 'cancel') {
							message.channel.send(
								new MessageEmbed().setDescription('Command canceled!'),
							);
							return;
						}

						const selectedNumber = parseInt(userReply, 10);

						if (
							isNaN(selectedNumber) ||
							selectedNumber < 1 ||
							selectedNumber > searchVideoResults.length
						) {
							message.channel.send(
								new MessageEmbed().setDescription(
									'Invalid option, command canceled!',
								),
							);
							return;
						}

						urlParam = searchVideoResults[selectedNumber - 1].url;
					}
				} catch (err) {
					// eslint-disable-next-line no-console
					console.log(err);
					message.channel.send('Response time has expired, command canceled!');
					return;
				}
			} catch (err) {
				// eslint-disable-next-line no-console
				console.log(err);
				message.channel.send(requestErrorMessage);
				return;
			}
		}

		// empty playlist collection
		const playlistVideos = [] as MusicCommand.SongType[];

		// empty song object
		let songObject = {} as MusicCommand.SongType;

		if (isYoutubePlaylist(urlParam)) {
			try {
				const playlistResponse = await youtubeSearch.getPlaylist(urlParam);
				const playlistThumbnail = playlistResponse.thumbnails.default?.url;

				const videosPlaylistResponse = await playlistResponse.fetchVideos(50);

				videosPlaylistResponse.forEach((video) => {
					if (video.private) return;

					const song = {
						title: filterText(video.title),
						url: video.url,
						duration: 0,
						thumbnail: video.thumbnails.default?.url || playlistThumbnail,
					} as MusicCommand.SongType;

					playlistVideos.push(song);
				});

				message.channel.send(
					new MessageEmbed().setDescription(
						`**${message.author.username}** added ${playlistVideos.length} songs to the queue.`,
					),
				);
			} catch (err) {
				// eslint-disable-next-line no-console
				console.log(err);
				message.channel.send(requestErrorMessage);
			}
		} else {
			const songInfo = await ydtl.getInfo(urlParam);

			const thumbnail = songInfo.player_response.videoDetails.thumbnail.thumbnails.find(
				(i) => i.width > 300,
			)?.url;

			songObject = {
				title: filterText(songInfo.videoDetails.title),
				url: songInfo.videoDetails.video_url,
				duration: parseInt(songInfo.videoDetails.lengthSeconds, 10),
				thumbnail: thumbnail || '',
			} as MusicCommand.SongType;

			message.channel.send(
				new MessageEmbed().setDescription(
					`New song added to list by: **${
						message.author.username
					}**\n\n**Title**: [${songObject.title}](${
						songObject.url
					})\n**Duration**: ${msToTime(songObject.duration * 1000)}`,
				),
			);
		}

		const queueExisting = queueCollection.get(message.guild.id);

		const queueConstruct = {
			textChannel: message.channel,
			voiceChannel: message.member?.voice.channel,
			connection: undefined,
			songs: [],
			playing: true,
		} as MusicCommand.QueueConstructType;

		if (!queueExisting) {
			queueCollection.set(message.guild.id, queueConstruct);

			if (playlistVideos.length > 0) {
				playlistVideos.forEach((video) => {
					queueConstruct.songs.push(video);
				});
			} else {
				queueConstruct.songs.push(songObject);
			}

			try {
				const connection = await message.member?.voice.channel?.join();

				queueConstruct.connection = connection;

				playMusic(message.guild, queueConstruct.songs[0]);
			} catch (err) {
				// eslint-disable-next-line no-console
				console.log(err);
				message.channel.send(requestErrorMessage);
			}
		} else {
			const filter = queueExisting.songs.find(
				(song) => song.title === songObject.title,
			);

			if (filter) {
				message.reply(
					new MessageEmbed().setDescription(
						`This song already exists in the playlist!`,
					),
				);
				return;
			}

			if (playlistVideos.length > 0) {
				playlistVideos.forEach((video) => {
					queueExisting.songs.push(video);
				});
			} else {
				queueExisting.songs.push(songObject);
			}

			if (message.deletable) message.delete();
		}
	},
} as CommandType;
