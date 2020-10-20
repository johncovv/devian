interface RegionType {
	full: string;
	short: string;
	server: string;
	language:
		| 'pt_BR'
		| 'en_GB'
		| 'ko_KR'
		| 'es_MX'
		| 'es_AR'
		| 'en_US'
		| 'en_AU'
		| 'ru_RU'
		| 'tr_TR'
		| 'ja_JP';
}

export const regionsArray = [
	{ full: 'BRAZIL', short: 'br', server: 'BR1', language: 'pt_BR' },
	{ full: 'EUROPE', short: 'eune', server: 'EUN1', language: 'en_GB' },
	{ full: 'EUROPE_WEST', short: 'euw', server: 'EUW1', language: 'en_GB' },
	{ full: 'KOREA', short: 'kr', server: 'KR', language: 'ko_KR' },
	{
		full: 'LATIN_AMERICA_NORTH',
		short: 'lan',
		server: 'LA1',
		language: 'es_MX',
	},
	{
		full: 'LATIN_AMERICA_SOUTH',
		short: 'las',
		server: 'LA2',
		language: 'es_AR',
	},
	{ full: 'NORTH_AMERICA', short: 'na', server: 'NA1', language: 'en_US' },
	{ full: 'OCEANIA', short: 'oce', server: 'OC1', language: 'en_AU' },
	{ full: 'RUSSIA', short: 'ru', server: 'RU', language: 'ru_RU' },
	{ full: 'TURKEY', short: 'tr', server: 'TR1', language: 'tr_TR' },
	{ full: 'JAPAN', short: 'jp', server: 'JP1', language: 'ja_JP' },
] as RegionType[];

export default (param: string): RegionType | undefined => {
	const exist = regionsArray.find((reg) =>
		new RegExp(reg.short, 'i').test(param.toLowerCase()),
	);

	return exist;
};
