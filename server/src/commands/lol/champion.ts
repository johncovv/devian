import { MessageEmbed } from 'discord.js';

import { Kayn, REGIONS } from 'kayn';

import stripHtmlTags from '../../utils/stripHtmlTags';
import getSummonerRegion, {
	regionsArray,
} from '../../utils/league-of-legends/getSummonerRegion';

import env from '../../../config/enviroment';

const { riotToken } = env;

export default {
	config: {
		tag: 'champ',
		description: 'Returns champion description',
		permissions: ['SEND_MESSAGES'],
	},
	run: async (client, message, args, prefix): Promise<void> => {
		const championNameParam = args?.join(' ').trim();

		if (!championNameParam || !args) {
			message.channel.send(
				new MessageEmbed().setDescription('❌ Champion name required!'),
			);
			return;
		}

		try {
			const regionParam = args[0];

			const region = getSummonerRegion(regionParam);

			if (!region) {
				message.channel.send(
					new MessageEmbed().setDescription(
						`❌ You need to declare the region in your preferred language:\n\n\`${regionsArray
							.map((r) => r.short)
							.join(
								'`, `',
							)}\`.\n\nExample of use: \`${prefix}champ jp aurelion sol\``,
					),
				);
				return;
			}

			const riot = Kayn(riotToken)({
				region: REGIONS.BRAZIL,
				locale: region.language,
			});

			args.shift();
			const champion = args
				.map((arg) => `${arg.charAt(0).toUpperCase()}${arg.slice(1)}`)
				.join('');

			const championData = Object.values(
				(await riot.DDragon.Champion.get(champion)).data,
			)[0];

			const championEmbed = new MessageEmbed();

			const developer = await client.users.fetch('426609168217276417');

			championEmbed
				.setTitle(championData.name)
				.setDescription(`**${championData.title}**\n${championData.lore}`)
				.setThumbnail(
					`https://cdn.communitydragon.org/latest/champion/${champion}/square`,
				)
				.setImage(
					`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion}_0.jpg`,
				)
				.setFooter(
					`Developed by: ${developer.username}`,
					`https://cdn.discordapp.com/avatars/426609168217276417/${developer.avatar}.png?size=128`,
				);

			championData.spells.forEach((spell) => {
				championEmbed.addField(
					`Abiliity: ${spell.name}`,
					stripHtmlTags(spell.description),
				);
			});

			message.channel.send(championEmbed);
		} catch (err) {
			// eslint-disable-next-line no-console
			console.error(err);

			const championName = args.join(' ').trim();

			message.channel.send(
				new MessageEmbed().setDescription(
					`❌ No champions with the name **${championName}** was found!`,
				),
			);
		}
	},
} as CommandType;
