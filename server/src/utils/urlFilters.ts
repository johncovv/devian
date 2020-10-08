export const isYoutubeVideo = (url: string): boolean => {
	const matches = url.match(
		/^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/,
	);
	return !!matches;
};

export const isYoutubePlaylist = (url: string): boolean => {
	const matches = url.match(
		/^https?:\/\/(www.youtube.com|youtube.com|youtu.be)\/playlist|list(.*)$/,
	);
	return !!matches;
};
