import mongoose from 'mongoose';

const { Schema } = mongoose;

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
		type: Number,
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
	},
});

mongoose.model('Guild', GuildSchema);
