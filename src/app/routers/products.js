import { Router } from 'express';
import ProductController from '../controllers/productController';
import verifyNumber from '../middlewares/verifyNumber';
import verifyString from '../middlewares/verifyString';
import pagination from '../middlewares/pagination';
import productMiddleware from '../middlewares/product';

const routes = new Router();

routes.get('/products', pagination, productMiddleware, ProductController.index);
routes.get(
  '/products/:id',
  verifyNumber,
  productMiddleware,
  ProductController.show
);
routes.post(
  '/products',
  verifyString,
  verifyNumber,
  productMiddleware,
  ProductController.store
);
routes.put(
  '/products/:id',
  verifyNumber,
  verifyString,
  productMiddleware,
  ProductController.update
);
routes.delete(
  '/products/:id',
  verifyNumber,
  productMiddleware,
  ProductController.delete
);

export default routes;
