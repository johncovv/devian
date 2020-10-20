declare namespace LeagueOfLegends {
	export interface Summoner {
		profileIconId: number;
		name: string;
		puuid: string;
		summonerLevel: number;
		revisionDate: number;
		id: string;
		accountId: string;
	}

	export interface RiotApi {
		REGIONS: {
			full: string;
			short: string;
			server: string;
			language: string;
		}[];
	}

	export interface MasteryChampion {
		championId: number;
		championLevel: number;
		championPoints: number;
		lastPlayTime: number;
		championPointsSinceLastLevel: number;
		championPointsUntilNextLevel: number;
		chestGranted: boolean;
		tokensEarned: number;
		summonerId: string;
	}
	export interface ChampionType {
		id: string;
		key: number;
		name: string;
		title: string;
		image: {
			full: string;
			sprite: string;
			group: string;
			w: number;
			h: number;
		};
		skins: { id: string; num: number; name: string; chromas: boolean }[];
		lore: string;
		blurb: string;
		allytips: string[];
		enemytips: string[];
		tags: string[];
		partype: string;
		info: {
			attack: number;
			defense: number;
			magic: number;
			difficulty: number;
		};
		stats: {
			hp: number;
			hpperlevel: number;
			mp: number;
			mpperlevel: number;
			movespeed: number;
			armor: number;
			armorperlevel: number;
			spellblock: number;
			spellblockperlevel: number;
			attackrange: number;
			hpregen: number;
			hpregenperlevel: number;
			mpregen: number;
			mpregenperlevel: number;
			crit: number;
			critperlevel: number;
			attackdamage: number;
			attackdamageperlevel: number;
			attackspeedperlevel: number;
			attackspeed: number;
		};
		spells: {
			id: string;
			name: string;
			description: string;
			tooltip: string;
			leveltip: {
				label: string[];
				effect: string[];
			};
			maxrank: number;
			cooldown: number[];
			cooldownBurn: string;
			cost: number[];
			effect: [number[] | null];
			effectBurn: [string | null];
			range: number[];
			costType: string;
			image: {
				full: string;
				sprite: string;
				group: string;
				x: number;
				y: number;
				w: number;
				h: number;
			};
		};
	}
}
