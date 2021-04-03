import { Router } from 'express';
import StockController from '../controllers/stockController';
import verifyNumber from '../middlewares/verifyNumber';
import pagination from '../middlewares/pagination';
import stockMiddleware from '../middlewares/stock';

const routes = new Router();

routes.get('/stocks', pagination, stockMiddleware, StockController.index);
routes.get(
  '/stocks/:id',
  verifyNumber,
  pagination,
  stockMiddleware,
  StockController.show
);
routes.post('/stocks', verifyNumber, stockMiddleware, StockController.store);
routes.put(
  '/stocks/:id',
  verifyNumber,
  stockMiddleware,
  StockController.update
);
routes.delete(
  '/stocks/:id',
  verifyNumber,
  stockMiddleware,
  StockController.delete
);

export default routes;
