import 'canvas';

declare module 'canvas' {
	export interface Canvas {
		toBuffer(string, { quality: number }): string | Buffer;
	}
}
