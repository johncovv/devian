export default (html: string): string => {
	return html.replace(/(<([^>]+)>)/gi, '');
};
