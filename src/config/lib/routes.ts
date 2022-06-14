import { Application, Router as expressRouter } from 'express';
import cors, { CorsOptions } from 'cors';

const apiRouter = expressRouter();

const corsOpt: CorsOptions = {
	origin: false,
};

/**
 * Setting API routes
 * @param {Application} app - Application instance
 */
export function initRoutes(app: Application) {
	app.use('/api', cors(corsOpt), apiRouter);

	/* routes 404 fallback */
	app.use('*', (req, res) => {
		return res.status(404).json({ status: 404, message: 'Request not found' });
	});
}
