import { KaynClass } from 'kayn';

import axios from 'axios';

import env from '../../../config/enviroment';

const { riotToken } = env;

export default async (
	riot: KaynClass,
	summonerId: number | string,
	region: string,
): Promise<LeagueOfLegends.ChampionType | void> => {
	// const summonerRegion = regions.find((reg) => reg.short === region);

	try {
		const summonerChampionsResponse = await axios.get(
			`https://${region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}`,
			{
				headers: {
					'X-Riot-Token': riotToken,
				},
			},
		);

		const summonerChampions = summonerChampionsResponse.data as LeagueOfLegends.MasteryChampion[];

		const firstChampionKey = summonerChampions[0].championId;

		const championsDataRequest = Object.values(
			(await riot.DDragon.Champion.list()).data,
		);

		const champion = (championsDataRequest.find(
			(champ) => parseInt(champ.key, 10) === firstChampionKey,
		) as unknown) as LeagueOfLegends.ChampionType;

		return champion;
	} catch (err) {
		// eslint-disable-next-line no-console
		console.error(err);
	}
};
