export const regionsArray = [
	{ full: 'BRAZIL', short: 'br', server: 'BR1' },
	{ full: 'EUROPE', short: 'eune', server: 'EUN1' },
	{ full: 'EUROPE_WEST', short: 'euw', server: 'EUW1' },
	{ full: 'KOREA', short: 'kr', server: 'KR' },
	{
		full: 'LATIN_AMERICA_NORTH',
		short: 'lan',
		server: 'LA1',
	},
	{
		full: 'LATIN_AMERICA_SOUTH',
		short: 'las',
		server: 'LA2',
	},
	{ full: 'NORTH_AMERICA', short: 'na', server: 'NA1' },
	{ full: 'OCEANIA', short: 'oce', server: 'OC1' },
	{ full: 'RUSSIA', short: 'ru', server: 'RU' },
	{ full: 'TURKEY', short: 'tr', server: 'TR1' },
	{ full: 'JAPAN', short: 'jp', server: 'JP1' },
];

interface RegionType {
	full: string;
	short: string;
	server: string;
}

export default (param: string): RegionType | undefined => {
	const exist = regionsArray.find((reg) =>
		new RegExp(reg.short, 'i').test(param.toLowerCase()),
	);

	return exist;
};
