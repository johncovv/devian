import express, { Application } from 'express';

import { DiscordClient } from './client';

/**
 * Setting API middlewares
 *
 * @param {Application} app - application instance
 */
export function initMiddlewares(app: Application): void {
	app.use(express.json({ limit: '10mb' }));

	/* starting Discord Client */
	const client = new DiscordClient().starts();

	/* adding Client instance on every API request */
	app.use('*', (req, res, next) => {
		req['client'] = client;

		next();
	});
}
