import Stock from '../models/Stock';

class StockController {
  async index(request, response) {
    const { limit, offset } = request;

    const result = await Stock.findAndCountAll({
      order: [
        ['region_id', 'ASC'],
        ['product_id', 'ASC'],
      ],
      limit,
      offset,
    });

    return response.status(200).json(result);
  }

  async show(request, response) {
    const { id, limit, offset } = request;

    const result = await Stock.findAndCountAll({
      where: {
        region_id: id,
      },
      order: [['product_id', 'ASC']],
      limit,
      offset,
    });

    return response.status(200).json(result);
  }

  async store(request, response) {
    const { productId, productQuant, regionId } = request;

    const result = await Stock.create({
      product_id: productId,
      product_quant: productQuant,
      region_id: regionId,
    });

    return response.status(201).json(result);
  }

  async update(request, response) {
    const { productId, productQuant, regionId, id } = request;

    const result = await Stock.update(
      {
        product_id: productId,
        product_quant: productQuant,
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

    await Stock.destroy({
      where: {
        id,
      },
    });

    return response.sendStatus(204);
  }
}

export default new StockController();
