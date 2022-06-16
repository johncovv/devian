import { FilterQuery } from 'mongoose';

import { IGuildRepository } from './guild.repository';
import { IGuild } from './guild.model';
import { Guild } from './guild.schema';

/**
 * Guild service class
 */
export class GuildService implements IGuildRepository {
	/**
	 * Register a new guild on database
	 *
	 * @param {IGuild} params
	 *
	 * @return {Promise<IGuild>} Created guild
	 */
	async create(params: IGuild): Promise<IGuild> {
		const createdGuild = await new Guild(params).save();

		return createdGuild.toObject();
	}

	/**
	 * Try to find a guild by id
	 *
	 * @param {Object.<string, string>} params
	 * @param {string} params.guildId - Discord client guild id
	 *
	 * @return {Promise<IGuild | null>} Guild data or null
	 */
	async readOne(params: { guildId: string }): Promise<IGuild | null> {
		const targetGuild = await Guild.findOne({ guildId: params.guildId }).exec();

		return targetGuild?.toObject() ?? null;
	}

	/**
	 * Get a list of guilds
	 *
	 * @param {Object.<string, any>} params
	 * @param {string} params.query - search query string
	 * @param {string} params.page - target page
	 * @param {string} params.regsPerPage - limit of documents per page
	 *
	 * @return {Promise<Array<IGuild>>} A list of guilds
	 */
	async readList(params: { query?: string; page?: number; regsPerPage?: number }): Promise<Array<IGuild>> {
		let { query, page, regsPerPage } = params;

		const filter: FilterQuery<IGuild> = {};

		if (page == null) page = 1;
		if (regsPerPage == null) regsPerPage = 50;

		if (query != null) {
			if (filter.$and == null) filter['$and'] = [];

			filter['$and'].push({
				name: { $regex: new RegExp(query, 'i') },
			});
		}

		const documentList = await Guild.find(filter)
			.limit(regsPerPage)
			.skip(regsPerPage * (page - 1))
			.exec();

		return documentList.map((doc) => doc.toObject());
	}
}
