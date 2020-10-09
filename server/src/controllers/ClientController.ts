import { Request, Response } from 'express';

import {
	getOnlyConfig,
	getOnlyConfigFromArray,
	getAllCommands,
} from '../utils/filtersForClientController';

export default {
	guilds: (req: Request, res: Response): Response => {
		const { guilds } = req.clientData;

		if (guilds) {
			return res.status(200).json(guilds);
		}

		return res.status(500).json({
			status: 500,
			error: 'Internal Error',
			message: 'We had an internal problem, try again in a few seconds.',
		});
	},
	commands: (req: Request, res: Response): Response => {
		const { commands } = req.clientData;

		if (commands) {
			return res.status(200).json(getAllCommands(commands));
		}

		return res.status(500).json({
			status: 500,
			error: 'Internal Error',
			message: 'We had an internal problem, try again in a few seconds.',
		});
	},
	getCommand: (req: Request, res: Response): Response => {
		const { commands } = req.clientData;

		if (commands) {
			const exist = commands.find(
				(c) => c.info.command.config.tag === req.params.command,
			);

			if (exist) {
				return res.status(200).json(getOnlyConfig(exist));
			}

			return res.status(404).json({
				status: 404,
				error: 'Command not found!',
				message: `The ${req.params.command} command was not found!`,
			});
		}

		return res.status(500).json({
			status: 500,
			error: 'Internal Error',
			message: 'We had an internal problem, try again in a few seconds.',
		});
	},
	getGroup: (req: Request, res: Response): Response => {
		const { commands } = req.clientData;

		if (commands) {
			const exist = commands.filter((c) => c.info.dir === req.params.group);

			if (exist.length > 0) {
				return res.status(200).json(getOnlyConfigFromArray(exist));
			}

			return res.status(404).json({
				status: 404,
				error: 'Command group not found!',
				message: `The ${req.params.group} command group was not found!`,
			});
		}

		return res.status(500).json({
			status: 500,
			error: 'Internal Error',
			message: 'We had an internal problem, try again in a few seconds.',
		});
	},
};
