import { Router } from 'express';
import DevolutionController from '../controllers/devolutionController';
import verifyNumber from '../middlewares/verifyNumber';
import pagination from '../middlewares/pagination';
import devolutionMiddleware from '../middlewares/devolution';

const routes = new Router();

routes.get(
  '/devolutions',
  pagination,
  devolutionMiddleware,
  DevolutionController.index
);
routes.get(
  '/devolutions/:id',
  verifyNumber,
  pagination,
  devolutionMiddleware,
  DevolutionController.show
);
routes.post(
  '/devolutions',
  verifyNumber,
  devolutionMiddleware,
  DevolutionController.store
);
routes.put(
  '/devolutions/:id',
  verifyNumber,
  devolutionMiddleware,
  DevolutionController.update
);
routes.delete(
  '/devolutions/:id',
  verifyNumber,
  devolutionMiddleware,
  DevolutionController.delete
);

export default routes;
