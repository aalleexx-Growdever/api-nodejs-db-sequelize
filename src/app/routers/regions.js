import { Router } from 'express';
import RegionController from '../controllers/regionController';
import verifyNumber from '../middlewares/verifyNumber';
import verifyString from '../middlewares/verifyString';
import pagination from '../middlewares/pagination';
import regionMiddleware from '../middlewares/region';

const routes = new Router();

routes.get('/regions', pagination, regionMiddleware, RegionController.index);
routes.get(
  '/regions/:id',
  verifyNumber,
  regionMiddleware,
  RegionController.show
);
routes.post('/regions', verifyString, regionMiddleware, RegionController.store);
routes.put(
  '/regions/:id',
  verifyNumber,
  verifyString,
  regionMiddleware,
  RegionController.update
);
routes.delete(
  '/regions/:id',
  verifyNumber,
  regionMiddleware,
  RegionController.delete
);

export default routes;
