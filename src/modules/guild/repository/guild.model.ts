import { ELanguage } from '@enums/language.enum';

export interface IGuild {
	guildId: string;
	name: string;
	icon: string;

	config: {
		prefix?: string;
		language: ELanguage;
	};
}
