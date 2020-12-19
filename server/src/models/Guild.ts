import mongoose, { Document } from 'mongoose';

const { Schema } = mongoose;

export interface GuildInstanceType extends Document {
	guildId: string;
	name: string;
	icon: string;
	config?: {
		prefix?: string;
		language?: string;
	};
}

const ConfigSchema = new Schema({
	prefix: {
		type: String,
		default: '?',
	},
	language: {
		type: String,
		default: 'en-us',
	},
});

const GuildSchema = new Schema({
	guildId: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	icon: {
		type: String,
		required: true,
	},
	config: {
		type: ConfigSchema,
		default: () => ({}),
		required: false,
	},
});

mongoose.model<GuildInstanceType>('Guild', GuildSchema);
