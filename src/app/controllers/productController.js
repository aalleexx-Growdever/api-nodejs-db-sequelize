import Product from '../models/Product';
import Sale from '../models/Sale';
import Devolution from '../models/Devolution';
import Stock from '../models/Stock';

class ProductController {
  async index(request, response) {
    const { limit, offset } = request;

    const result = await Product.findAndCountAll({
      limit,
      offset,
      order: [['category_id', 'ASC']],
    });

    return response.status(200).json(result);
  }

  async show(request, response) {
    const { id } = request;

    const result = await Product.findOne({
      where: {
        id,
      },
    });

    return response.status(200).json(result);
  }

  async store(request, response) {
    const { name, price, categoryId } = request;

    const result = await Product.create({
      name,
      price,
      category_id: categoryId,
    });

    return response.status(201).json(result);
  }

  async update(request, response) {
    const { name, price, categoryId, id } = request;

    const result = await Product.update(
      {
        name,
        price,
        category_id: categoryId,
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
    const { id, sale, devolution, stock } = request;

    if (devolution === true) {
      await Devolution.destroy({
        where: {
          product_id: id,
        },
      });
    }

    if (sale === true) {
      await Sale.destroy({
        where: {
          product_id: id,
        },
      });
    }

    if (stock === true) {
      await Stock.destroy({
        where: {
          product_id: id,
        },
      });
    }

    await Product.destroy({
      where: {
        id,
      },
    });

    return response.sendStatus(204);
  }
}

export default new ProductController();
