import { MessageEmbed } from 'discord.js';
import fetch from 'node-fetch';

import env from '../../../config/enviroment';

interface AnimeTypeResponse {
	Id: number;
	Nome: string;
	Desc: string;
	Status: boolean;
	Imagem: string;
	Ano: string;
	Categoria: string;
	Rank: number;
}

export default {
	config: {
		tag: 'anime',
		description:
			'Search anime on [animes.johncovv.com](http://animes.johncovv.com) (only PT-BR)!',
		permissions: ['SEND_MESSAGES'],
	},
	run: async (client, message, args): Promise<void> => {
		const admin = await client.users.fetch('426609168217276417');

		const arg = args?.join(' ').trim();

		const requestErrorMessage = `
		Houve um erro na busca, tente novamente mais tarde.\nCaso o erro persista entre em contato com o desenvolvedor:\n\nDiscord: [${admin.tag}](https://discordapp.com/users/${admin.id})\nTwitter: [@johncovv](https://twitter.com/johncovv)`;

		const embed = new MessageEmbed();

		// if the parameter is less than 2 characters
		if (arg && arg?.length < 2) {
			message.channel.send(
				embed.setDescription(
					`🚧 Para fazer a pesquisa é necessário no mínimo 2 caracteres`,
				),
			);
			return;
		}

		embed.setFooter(
			`Desenvolvido por ${admin.username}`,
			`https://cdn.discordapp.com/avatars/${admin.id}/${admin.avatar}.png`,
		);

		// if the user has not passed any parameter it returns the last 20 animes
		if (!arg) {
			try {
				const getRecentsAnimes = await fetch(
					`${env.animeBaseUrl}/api/animes/recentes`,
				);

				const jsonData = (await getRecentsAnimes.json()) as AnimeTypeResponse[];

				let recentesEmbedDescription = '';

				jsonData.forEach((anime, index) => {
					const position = index + 1;

					if (position <= 20) {
						recentesEmbedDescription += `[${anime.Nome}](http://animes.johncovv.com/anime/${anime.Id})\n`;
					}
				});

				embed
					.setDescription(recentesEmbedDescription)
					.setTitle('Lista dos 20 animes mais recentes');
			} catch (err) {
				embed.setDescription(requestErrorMessage);
			}

			// if the user has passed parameters with more than 2 characters, search the api
		} else {
			try {
				const getAnimeByTitle = await fetch(
					`${env.animeBaseUrl}/odata/Animesdb?%24filter=substringof('${arg}',Nome)&%24select=Id,Nome,Imagem,Rank&$top=20`,
				);

				const jsonData = (await getAnimeByTitle.json()) as {
					value: AnimeTypeResponse[];
				};

				if (jsonData.value.length === 0) {
					message.channel.send(
						embed.setDescription(
							`⁉ Nenhum anime encontrado com o título **${arg}**!`,
						),
					);
					return;
				}

				let searchRequestDescription = `Resultados de busca para **${arg}**\n\n`;

				jsonData.value.forEach((anime, index) => {
					const position = index + 1;

					if (position <= 20) {
						searchRequestDescription += `[${anime.Nome}](http://animes.johncovv.com/anime/${anime.Id})\n`;
					}
				});

				embed.setDescription(searchRequestDescription);
			} catch (err) {
				embed.setDescription(requestErrorMessage);
			}
		}

		message.channel.send(embed);
	},
} as CommandType;
