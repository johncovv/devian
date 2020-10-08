import { Util } from 'discord.js';

export default (string: string): string => {
	const formated = Util.escapeMarkdown(string);

	return formated;
};
