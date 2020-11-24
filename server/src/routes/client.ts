import { Router } from 'express';

import clientController from '../controllers/ClientController';

const routes = Router();

routes.get('/guilds', clientController.guilds);

routes.get('/commands', clientController.commands);

routes.get('/command/tag/:command', clientController.getCommand);

routes.get('/command/group/:group', clientController.getGroup);

export default routes;
