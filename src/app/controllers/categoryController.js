import Category from '../models/Category';
import Product from '../models/Product';

class CategoryController {
  async index(request, response) {
    const { limit, offset } = request;
    const result = await Category.findAll({
      limit,
      offset,
      order: [['name', 'ASC']],
    });

    return response.status(200).json(result);
  }

  async show(request, response) {
    const { id } = request;

    const result = await Category.findOne({
      where: {
        id,
      },
    });

    return response.status(200).json(result);
  }

  async store(request, response) {
    const { name } = request;

    const result = await Category.create({
      name,
    });

    return response.status(201).json(result);
  }

  async update(request, response) {
    const { name, id } = request;

    const result = await Category.update(
      {
        name,
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
    const { id, product } = request;

    if (product) {
      await Product.destroy({
        where: {
          category_id: id,
        },
      });
    }

    await Category.destroy({
      where: {
        id,
      },
    });

    return response.sendStatus(204);
  }
}

export default new CategoryController();
