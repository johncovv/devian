import { MessageEmbed } from 'discord.js';
import { Kayn } from 'kayn';

import env from '../../../config/enviroment';

import InternalErrorMessage from '../../utils/internalErrorResponse';
import createSummonerCard from '../../utils/league-of-legends/createSummonerCard';
import getSummonerRegion, {
	regionsArray,
} from '../../utils/league-of-legends/getSummonerRegion';

const { riotToken } = env;

export default {
	config: {
		tag: 'summoner',
		description: 'Returns a personalized summoner card!',
		permissions: ['SEND_MESSAGES'],
	},
	run: async (client, message, args, prefix): Promise<void> => {
		const existArgs = args?.join(' ').trim();

		if (!existArgs || !args) {
			message.channel.send(
				new MessageEmbed().setDescription(`❌ You need to specify a summoner!`),
			);
			return;
		}

		const regionParam = args[0];

		const userRegion = getSummonerRegion(regionParam);

		if (!userRegion) {
			message.channel.send(
				new MessageEmbed().setDescription(
					`❌ Need to declare a region, choose one of the options:\n\n\`${regionsArray
						.map((r) => r.short)
						.join(
							'`, `',
						)}\`.\n\nExample of use: \`${prefix}summoner kr Hide on bush\``,
				),
			);
			return;
		}

		const serverName = userRegion.short;
		const serverId = userRegion.server;

		const riot = Kayn(riotToken)({
			region: serverName,
		});

		args.shift();
		const summonerNick = args.join(' ');

		try {
			const summoner = await riot.Summoner.by.name(summonerNick);

			const { name } = summoner;

			const alertLoadingCarMessage = await message.channel.send(
				new MessageEmbed()
					.setDescription(`Creating **${name}'s** card!`)
					.setAuthor(
						'wait a few seconds...',
						'https://media2.giphy.com/media/l2SpY4SJZy8b3BMHK/giphy.gif',
					),
			);

			const summonerCard = await createSummonerCard(
				riot,
				summoner as LeagueOfLegends.Summoner,
				serverId,
			);

			message.reply(summonerCard);
			alertLoadingCarMessage.delete();
		} catch (err) {
			if (err.statusCode === 404) {
				message.channel.send(
					new MessageEmbed().setDescription(
						`❓ No summoner with nick **${summonerNick}** was found!`,
					),
				);
			} else {
				// eslint-disable-next-line no-console
				console.error(err);

				message.channel.send(InternalErrorMessage(client));
			}
		}
	},
} as CommandType;
