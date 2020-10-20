export default (level: number): number => {
	if (level < 30) return 1;

	if (level < 50) return 30;

	let match = 0;

	for (let i = 50; i <= level && i <= 500; i += 25) {
		match = i;
	}

	return match;
};
