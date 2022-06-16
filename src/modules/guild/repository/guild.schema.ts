import mongoose, { Schema } from 'mongoose';

import { IGuild } from '@modules/guild/repository';
import { ELanguage } from '@enums/language.enum';

const guildSchema = new Schema<IGuild>(
	{
		guildId: { type: String, required: true },
		name: { type: String, required: true },
		icon: { type: String, required: true },

		config: {
			prefix: { type: String, required: false },
			language: { type: String, required: true, default: ELanguage.EN_US },
		},
	},
	{
		collection: 'guild',
		read: 'nearest',
		timestamps: true,
	},
);

export const Guild = mongoose.model('Guild', guildSchema);
