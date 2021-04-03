import { Router } from 'express';
import ReasonController from '../controllers/reasonController';
import verifyNumber from '../middlewares/verifyNumber';
import verifyString from '../middlewares/verifyString';
import pagination from '../middlewares/pagination';
import reasonMiddleware from '../middlewares/reason';

const routes = new Router();

routes.get('/reasons', pagination, reasonMiddleware, ReasonController.index);
routes.get(
  '/reasons/:id',
  verifyNumber,
  reasonMiddleware,
  ReasonController.show
);
routes.post('/reasons', verifyString, reasonMiddleware, ReasonController.store);
routes.put(
  '/reasons/:id',
  verifyNumber,
  verifyString,
  reasonMiddleware,
  ReasonController.update
);
routes.delete(
  '/reasons/:id',
  verifyNumber,
  reasonMiddleware,
  ReasonController.delete
);

export default routes;
