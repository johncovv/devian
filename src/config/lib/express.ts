import express from 'express';

import { initRoutes } from './routes';
import { initMiddlewares } from './middlewares';

/**
 * Express object
 */
class Express {
	public app: express.Application;

	/**
	 * Store express instance on Express.app & Setting additional API functions
	 */
	constructor() {
		this.app = express();

		initMiddlewares(this.app);
		initRoutes(this.app);
	}
}

export default new Express().app;
