import { CollectorFilter, MessageEmbed } from 'discord.js';
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
	run: async (client, message, args, prefix): Promise<void> => {
		const admin = await client.users.fetch('426609168217276417');

		const arg = args?.join(' ').trim();

		const requestErrorMessage = new MessageEmbed().setDescription(`
		Houve um erro na busca, tente novamente mais tarde.\nCaso o erro persista entre em contato com o desenvolvedor:\n\nDiscord: [${admin.tag}](https://discordapp.com/users/${admin.id})\nTwitter: [@johncovv](https://twitter.com/johncovv)`);

		// if the parameter is less than 2 characters
		if (arg && arg?.length < 2) {
			message.channel.send(
				new MessageEmbed().setDescription(
					`🚧 Para fazer a pesquisa é necessário no mínimo 2 caracteres`,
				),
			);
			return;
		}

		// if the user has not passed any parameter it returns the last 20 animes
		if (!arg || arg.length === 0) {
			try {
				const getRecentsAnimes = await fetch(
					`${env.animeBaseUrl}/api/animes/recentes`,
				);

				const jsonData = (await getRecentsAnimes.json()) as AnimeTypeResponse[];

				let recentsAnimesEmbedDescription = '';

				jsonData.forEach((anime, index) => {
					const position = index + 1;

					if (position <= 20) {
						recentsAnimesEmbedDescription += `[${anime.Nome}](http://animes.johncovv.com/anime/${anime.Id})\n`;
					}
				});

				const recentsEmbed = new MessageEmbed();

				recentsEmbed
					.setDescription(recentsAnimesEmbedDescription)
					.setTitle('Lista dos 20 animes mais recentes');

				message.channel.send(recentsEmbed);
				return;
			} catch (err) {
				message.channel.send(requestErrorMessage);
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
						new MessageEmbed().setDescription(
							`⁉ Nenhum anime encontrado com o título **${arg}**!`,
						),
					);
					return;
				}

				let searchRequestDescription = `${jsonData.value.length}  Resultados para **${arg}**.\nEnvie o número do anime para mais detalhes.\n\n`;

				jsonData.value.forEach((anime, index) => {
					const position = index + 1;

					if (position <= 20) {
						searchRequestDescription += `[${position}] - [${anime.Nome}](http://animes.johncovv.com/anime/${anime.Id})\n`;
					}
				});

				const animesSearchResultsEmbed = new MessageEmbed();

				animesSearchResultsEmbed
					.setDescription(searchRequestDescription)
					.setFooter(
						'Envie a resposta em até 10 segundos, ou envie "cancelar"!',
					);

				message.channel.send(animesSearchResultsEmbed);

				const filter: CollectorFilter = (m) =>
					m.author.id === message.author.id;

				try {
					const getUserResponse = await message.channel.awaitMessages(filter, {
						max: 1,
						time: 10000,
						errors: ['time'],
					});

					const userResponse = getUserResponse.first();

					const userResponseContent = userResponse?.content;

					if (userResponseContent) {
						if (userResponseContent === 'cancelar') {
							message.channel.send(
								new MessageEmbed().setDescription('✅ Comando cancelado!'),
							);
							return;
						}

						if (userResponseContent.startsWith(prefix)) {
							return;
						}

						const parsed = parseInt(userResponseContent, 10);

						if (isNaN(parsed) || parsed < 1 || parsed > jsonData.value.length) {
							message.channel.send(
								new MessageEmbed().setDescription('⛔ Opção inválida!'),
							);
							return;
						}

						try {
							const getRequestedAnime = await fetch(
								`${env.animeBaseUrl}/odata/Animesdb?$filter=Id eq ${
									jsonData.value[parsed - 1].Id
								}`,
							);

							const parsedToJson = (await getRequestedAnime.json()) as {
								value: AnimeTypeResponse[];
							};

							const animeResponseData = parsedToJson.value[0];

							const animeDescriptionEmbed = new MessageEmbed();

							animeDescriptionEmbed
								.setImage(animeResponseData.Imagem)
								.setDescription(
									`**[${animeResponseData.Nome}](http://animes.johncovv.com/anime/${animeResponseData.Id})**`,
								)
								.addField('Lançamento', `${animeResponseData.Ano}`, true)
								.addField(
									'Status',
									`${animeResponseData.Status ? `Ativo` : `Completo`}`,
									true,
								)
								.addField(
									'Categorias:',
									`${animeResponseData.Categoria}`,
									false,
								)
								.addField('Sinopse:', `${animeResponseData.Desc}\n\n\n`, false);

							message.channel.send(animeDescriptionEmbed);
						} catch (err) {
							message.channel.send(requestErrorMessage);
							return;
						}
					}
				} catch (err) {
					message.channel.send(
						new MessageEmbed().setDescription(
							'⁉ Não foi enviada nenhuma resposta entre os 10 segundos, comando cancelado!',
						),
					);
					return;
				}
			} catch (err) {
				message.channel.send(requestErrorMessage);
			}
		}
	},
} as CommandType;
