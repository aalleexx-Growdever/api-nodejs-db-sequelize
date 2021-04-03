import { Router } from 'express';
import CategoryController from '../controllers/categoryController';
import categoryMiddleware from '../middlewares/category';
import verifyNumber from '../middlewares/verifyNumber';
import verifyString from '../middlewares/verifyString';
import pagination from '../middlewares/pagination';

const routes = new Router();

routes.get(
  '/categories',
  pagination,
  categoryMiddleware,
  CategoryController.index
);
routes.get(
  '/categories/:id',
  verifyNumber,
  categoryMiddleware,
  CategoryController.show
);
routes.post(
  '/categories',
  verifyString,
  categoryMiddleware,
  CategoryController.store
);
routes.put(
  '/categories/:id',
  verifyNumber,
  verifyString,
  categoryMiddleware,
  CategoryController.update
);
routes.delete(
  '/categories/:id',
  verifyNumber,
  categoryMiddleware,
  CategoryController.delete
);

export default routes;
