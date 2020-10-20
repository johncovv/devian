import { MessageAttachment } from 'discord.js';
import { KaynClass } from 'kayn';

import Canvas from 'canvas';

import path from 'path';
import { readFileSync } from 'fs';

import getSummonerBorderIconByLevel from './getSummonerBorderIconByLevel';
import getMostPlayedSummonerChampion from './getMostPlayedSummonerChampion';

export default async (
	riot: KaynClass,
	summoner: LeagueOfLegends.Summoner,
	region: string,
): Promise<MessageAttachment> => {
	const { id, name, profileIconId, summonerLevel } = summoner;

	// CANVAS INIT
	const canvas = Canvas.createCanvas(422, 199);
	const context = canvas.getContext('2d');
	Canvas.registerFont(
		path.join(__dirname, '..', '..', 'assets', 'fonts', 'lol-font.ttf'),
		{ family: 'lol' },
	);

	/** *********************************
	 * RECTANGLE LIMITER BACKGROUND PATH
	 ********************************** */
	context.save();
	context.beginPath();
	context.rect(10, 11, 400, 176);
	context.clip();

	const favoriteChampion = (await getMostPlayedSummonerChampion(
		riot,
		id,
		region,
	)) as LeagueOfLegends.ChampionType;

	// CHAMPION BAGKGROUND
	const champBackground = await Canvas.loadImage(
		`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${favoriteChampion.id}_0.jpg`,
	);
	context.drawImage(champBackground, 13, -15, 392, 231);

	// BACKGROUND DESIGN CARD
	const backgroundCard = readFileSync(
		path.join(__dirname, '..', '..', 'assets', 'img', 'background-card.png'),
	);
	const background = await Canvas.loadImage(backgroundCard);
	context.drawImage(background, 0, 0, 422, 199);

	// RESTORE CANVAS CONTEXT
	context.restore();

	// MASTERY TOTAL SCORE
	const masteryScore = (
		await riot.ChampionMastery.totalScore((id as unknown) as number)
	).toString();

	context.font = '15px "lol"';
	context.fillStyle = '#f4e9d5';
	context.fillText(masteryScore, 47, 38);

	// NAME TEXT
	context.font = '15px "lol"';
	context.fillStyle = '#d9d3c4';
	context.fillText(name, 166, 119);

	// player + server
	context.font = '10px "lol"';
	context.fillStyle = '#545450';
	context.fillText(
		`${name.toUpperCase().replace(/\s+/g, '')} #${region.toUpperCase()}`,
		168,
		138,
	);

	// GET RANKED INFOS BY PLAYER ID
	const ranked = await riot.League.Entries.by.summonerID(id);

	if (ranked.length > 0) {
		const tier = `${ranked[0].tier} ${ranked[0].rank}`;

		let type = ranked[0].queueType?.split('_')[1];

		if (type === 'SOLO') type = 'Solo/Duo';

		context.font = '11px "lol"';
		context.fillStyle = '#d9d3c4';
		context.fillText(`${tier} ( ${type})`, 191, 161);

		const tierRanked = ranked[0].tier as string;

		const rankedIconFile = readFileSync(
			path.join(
				__dirname,
				'..',
				'..',
				'assets',
				'img',
				'ranked-card-icon',
				`${tierRanked.toLowerCase()}.png`,
			),
		);

		const rankedIcon = await Canvas.loadImage(rankedIconFile);

		context.drawImage(rankedIcon, 168, 148, 19, 15);
	}

	/** *********************************
	 * CIRCLE LIMITER MASK
	 ********************************** */
	context.save();
	context.beginPath();
	context.arc(94, 115, 34.5, 0, Math.PI * 2, false);
	context.clip();

	// avatar
	const avatar = await Canvas.loadImage(
		`https://ddragon.leagueoflegends.com/cdn/10.5.1/img/profileicon/${profileIconId}.png`,
	);
	context.drawImage(avatar, 60, 81, 69, 69);
	context.restore();

	// GET BORDER BASED ON PLAYER LEVEL
	const borderIcon = getSummonerBorderIconByLevel(summonerLevel);
	const borderFile = readFileSync(
		path.join(
			__dirname,
			'..',
			'..',
			'assets',
			'img',
			'level-border',
			`${borderIcon}.png`,
		),
	);
	const border = await Canvas.loadImage(borderFile);
	context.drawImage(border, 10, 31, 166, 166);

	// LEVEL TEXT
	context.font = '12px "lol"';
	context.fillStyle = '#d9d3c4';
	context.fillText(summonerLevel.toString(), 84, 160);

	/** *********************************
	 * CONCLUSION CODE
	 ********************************** */

	// create attachment with canvas buffer with player name
	const attach = new MessageAttachment(
		canvas.toBuffer('image/png', { quality: 0.3 }),
		`${name.toLowerCase().replace(/\s+/g, '')}-lol-card.jpg`,
	);

	return attach;
};
