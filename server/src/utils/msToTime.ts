export default (duration: number): string => {
	let seconds = Math.floor((duration / 1000) % 60) as string | number;
	let minutes = Math.floor((duration / (1000 * 60)) % 60) as string | number;
	let hours = Math.floor((duration / (1000 * 60 * 60)) % 24) as string | number;

	hours = hours < 10 ? `0${hours}` : hours;
	minutes = minutes < 10 ? `0${minutes}` : minutes;
	seconds = seconds < 10 ? `0${seconds}` : seconds;

	hours = hours > 0 ? `${hours}:` : '';

	return `${hours + minutes}:${seconds}`;
};
