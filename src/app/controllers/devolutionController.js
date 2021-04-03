import Devolution from '../models/Devolution';

class DevolutionController {
  async index(request, response) {
    const { limit, offset } = request;

    const result = await Devolution.findAndCountAll({
      limit,
      offset,
      order: [['product_id', 'ASC']],
    });

    return response.status(200).json(result);
  }

  async show(request, response) {
    const { id, limit, offset } = request;

    const result = await Devolution.findAndCountAll({
      where: {
        product_id: id,
      },
      limit,
      offset,
    });

    return response.status(200).json(result);
  }

  async store(request, response) {
    const { productId, quantity, reasonId, category } = request;

    const result = await Devolution.create({
      product_id: productId,
      quantity,
      reason_id: reasonId,
      category_id: category,
    });

    return response.status(201).json(result);
  }

  async update(request, response) {
    const { productId, quantity, reasonId, id, category } = request;

    const result = await Devolution.update(
      {
        product_id: productId,
        quantity,
        reason_id: reasonId,
        category_id: category,
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

    await Devolution.destroy({
      where: {
        id,
      },
    });

    return response.sendStatus(204);
  }
}

export default new DevolutionController();
