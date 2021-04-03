import Sale from '../models/Sale';

class SaleController {
  async index(request, response) {
    const { limit, offset } = request;

    const result = await Sale.findAndCountAll({
      limit,
      offset,
      order: [['region_id', 'ASC']],
    });

    return response.status(200).json(result);
  }

  async show(request, response) {
    const { id } = request;

    const result = await Sale.findOne({
      where: {
        id,
      },
    });

    return response.status(200).json(result);
  }

  async store(request, response) {
    const { productId, quantity, regionId, total, category } = request;

    const result = await Sale.create({
      product_id: productId,
      quantity,
      total,
      region_id: regionId,
      category_id: category,
    });

    return response.status(201).json(result);
  }

  async update(request, response) {
    const { productId, quantity, regionId, total, id } = request;

    const result = await Sale.update(
      {
        product_id: productId,
        quantity,
        total,
        region_id: regionId,
      },
      {
        where: {
          id,
        },
        returning: true,
      }
    );

    return response.status(200).json(result);
  }

  async delete(request, response) {
    const { id } = request;

    await Sale.destroy({
      where: {
        id,
      },
    });

    return response.sendStatus(204);
  }
}

export default new SaleController();
