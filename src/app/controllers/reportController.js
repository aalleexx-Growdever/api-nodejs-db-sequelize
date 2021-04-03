import sequelize from 'sequelize';
import Devolution from '../models/Devolution';
import Product from '../models/Product';
import Category from '../models/Category';
import Reason from '../models/Reason';
import Sale from '../models/Sale';
import Region from '../models/Region';

class ReportController {
  async categoryReturned(request, response) {
    const { limit, offset } = request;

    const result = await Devolution.findAll({
      include: [{ model: Category, as: 'category', attributes: ['name'] }],
      attributes: [
        'category_id',
        [sequelize.fn('sum', sequelize.col('quantity')), 'devolutions'],
      ],
      group: ['category_id', 'category.name', 'category.id'],
      order: sequelize.literal('devolutions DESC'),
      limit,
      offset,
    });

    return response.status(200).json(result);
  }

  async productReturned(request, response) {
    const { limit, offset } = request;

    const result = await Devolution.findAll({
      include: [{ model: Product, as: 'product', attributes: ['name'] }],
      attributes: [
        'product_id',
        [sequelize.fn('sum', sequelize.col('quantity')), 'devolutions'],
      ],
      group: ['product_id', 'product.name', 'product.id'],
      order: sequelize.literal('devolutions DESC'),
      limit,
      offset,
    });

    return response.status(200).json(result);
  }

  async reasonReturned(request, response) {
    const { limit, offset } = request;

    const result = await Devolution.findAll({
      include: [{ model: Reason, as: 'reason', attributes: ['description'] }],
      attributes: [
        'reason_id',
        [sequelize.fn('sum', sequelize.col('quantity')), 'devolutions'],
      ],
      group: ['reason_id', 'reason.description', 'reason.id'],
      order: sequelize.literal('devolutions DESC'),
      limit,
      offset,
    });

    return response.status(200).json(result);
  }

  async categorySold(request, response) {
    const { limit, offset } = request;

    const result = await Sale.findAll({
      include: [{ model: Category, as: 'category', attributes: ['name'] }],
      attributes: [
        'category_id',
        [sequelize.fn('sum', sequelize.col('quantity')), 'sales'],
      ],
      group: ['category_id', 'category.name', 'category.id'],
      order: sequelize.literal('sales DESC'),
      limit,
      offset,
    });

    return response.status(200).json(result);
  }

  async productSold(request, response) {
    const { limit, offset } = request;

    const result = await Devolution.findAll({
      include: [{ model: Product, as: 'product', attributes: ['name'] }],
      attributes: [
        'product_id',
        [sequelize.fn('sum', sequelize.col('quantity')), 'sales'],
      ],
      group: ['product_id', 'product.name', 'product.id'],
      order: sequelize.literal('sales DESC'),
      limit,
      offset,
    });

    return response.status(200).json(result);
  }

  async regionSeller(request, response) {
    const { limit, offset } = request;

    const result = await Devolution.findAll({
      include: [{ model: Region, as: 'region', attributes: ['name'] }],
      attributes: [
        'region_id',
        [sequelize.fn('sum', sequelize.col('quantity')), 'sales'],
      ],
      group: ['region_id', 'region.name', 'region.id'],
      order: sequelize.literal('sales DESC'),
      limit,
      offset,
    });

    return response.status(200).json(result);
  }
}

export default new ReportController();
