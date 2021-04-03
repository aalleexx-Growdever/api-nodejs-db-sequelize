import { Router } from 'express';
import ReportController from '../controllers/reportController';
import pagination from '../middlewares/pagination';
import reportMiddleware from '../middlewares/report';

const routes = new Router();

routes.get(
  '/reports/returned_category',
  pagination,
  reportMiddleware,
  ReportController.categoryReturned
);
routes.get(
  '/reports/returned_product',
  pagination,
  reportMiddleware,
  ReportController.productReturned
);
routes.get(
  '/reports/returned_reason',
  pagination,
  reportMiddleware,
  ReportController.reasonReturned
);
routes.get(
  '/reports/sold_category',
  pagination,
  reportMiddleware,
  ReportController.categorySold
);
routes.get(
  '/reports/sold_product',
  pagination,
  reportMiddleware,
  ReportController.productSold
);
routes.get(
  '/reports/region_seller',
  pagination,
  reportMiddleware,
  ReportController.regionSeller
);

export default routes;
