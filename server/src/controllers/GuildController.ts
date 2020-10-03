/* eslint-disable no-console */
import { Guild } from 'discord.js';
import mongoose from 'mongoose';

mongoose.set('useFindAndModify', false);

const GuildModel = mongoose.model('Guild');

export default {
	async find(id: string | number): Promise<mongoose.Document | undefined> {
		try {
			const response = await GuildModel.findOne({ guildId: id });

			if (response) return response;

			return undefined;
		} catch (err) {
			console.log(
				`GUILD CONTROLLER FIND [${new Date().toLocaleString()}]:`,
				err,
			);
			return undefined;
		}
	},
	async register(
		guild: Guild,
		config?: { prefix?: string; language?: string },
	): Promise<mongoose.Document | undefined> {
		const { id, icon, name } = guild;

		const guildIcon = `https://cdn.discordapp.com/icons/${id}/${icon}.png`;

		try {
			const response = await GuildModel.create({
				guildId: id,
				name,
				icon: guildIcon,
				config,
			});

			return response;
		} catch (err) {
			console.log(
				`GUILD CONTROLLER REGISTER [${new Date().toLocaleString()}]:`,
				err,
			);
			return undefined;
		}
	},
	async update(guild: GuildType): Promise<mongoose.Document | undefined> {
		try {
			const response = await GuildModel.findByIdAndUpdate(guild._id, guild, {
				new: true,
			});

			if (response) {
				return response;
			}

			return undefined;
		} catch (err) {
			console.log(
				`GUILD CONTROLLER UPDATE [${new Date().toLocaleString()}]:`,
				err,
			);
			return undefined;
		}
	},
};
