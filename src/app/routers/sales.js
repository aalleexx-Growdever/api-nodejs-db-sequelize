import { Router } from 'express';
import SaleController from '../controllers/saleController';
import verifyNumber from '../middlewares/verifyNumber';
import pagination from '../middlewares/pagination';
import saleMiddleware from '../middlewares/sale';
import verifyQuantity from '../middlewares/verifyQuantity';

const routes = new Router();

routes.get('/sales', pagination, saleMiddleware, SaleController.index);
routes.get('/sales/:id', verifyNumber, saleMiddleware, SaleController.show);
routes.post(
  '/sales',
  verifyNumber,
  saleMiddleware,
  verifyQuantity,
  SaleController.store
);
routes.put('/sales/:id', verifyNumber, saleMiddleware, SaleController.update);
routes.delete(
  '/sales/:id',
  verifyNumber,
  saleMiddleware,
  SaleController.delete
);

export default routes;
