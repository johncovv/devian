import { Application } from 'express';

import expressApp from '@config/lib/express';
import env from '@config/env';

/**
 * App object
 */
class App {
	private app: Application;

	/**
	 * Take the express instance and save it in App.app
	 */
	constructor() {
		this.app = expressApp;
	}

	/**
	 * Start the API execution
	 */
	public starts(): void {
		const { server, app } = env;

		this.app.listen(server.port, () => {
			const info = [];

			info.push('\n----------');
			info.push(`Running on port: ${server.port}`);
			info.push(`Server HOST: ${server.host}`);
			info.push('');
			info.push(`Package name: ${app.name}`);
			info.push(`Package version: ${app.version}`);
			info.push('----------\n');

			console.info(info.join('\n'));
		});
	}
}

export { App };
