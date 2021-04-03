import { Router } from 'express';
import NearbyRegionController from '../controllers/nearbyRegionController';
import verifyNumber from '../middlewares/verifyNumber';
import nearbyRegionMiddleware from '../middlewares/nearbyRegion';
import pagination from '../middlewares/pagination';

const routes = new Router();

routes.get(
  '/nearby_regions',
  pagination,
  nearbyRegionMiddleware,
  NearbyRegionController.index
);
routes.get(
  '/nearby_regions/:id',
  verifyNumber,
  pagination,
  nearbyRegionMiddleware,
  NearbyRegionController.show
);
routes.post(
  '/nearby_regions',
  verifyNumber,
  nearbyRegionMiddleware,
  NearbyRegionController.store
);
routes.put(
  '/nearby_regions/:id',
  verifyNumber,
  nearbyRegionMiddleware,
  NearbyRegionController.update
);
routes.delete(
  '/nearby_regions/:id',
  verifyNumber,
  nearbyRegionMiddleware,
  NearbyRegionController.delete
);

export default routes;
