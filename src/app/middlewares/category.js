import Category from '../models/Category';
import Product from '../models/Product';

export default async (request, response, next) => {
  const { url, method, id, name, limit, offset } = request;

  if (method === 'GET' && url === `/categories/${id}`) {
    if (id === null) {
      return response.status(400).json({ message: 'Missing parameters' });
    }

    const result = await Category.findOne({ where: { id } });

    if (!result || result === null) {
      return response
        .status(404)
        .json({ message: 'There is no one relative category in database.' });
    }

    return next();
  }

  if (method === 'GET') {
    if (limit === null || offset === null) {
      return response.status(400).json({ message: 'Missing parameters' });
    }

    const result = await Category.findOne();

    if (!result || result === null) {
      return response
        .status(404)
        .json({ message: 'There is no one category in database.' });
    }

    return next();
  }

  if (method === 'POST') {
    if (name === null) {
      return response.status(400).json({ message: 'Missing parameters.' });
    }

    const exists = await Category.findOne({ where: { name } });

    if (exists) {
      return response
        .status(409)
        .json({ message: 'Category name already exists in database.' });
    }

    return next();
  }

  if (method === 'PUT') {
    if (id === null || name === null) {
      return response.status(400).json({ message: 'Missing parameters.' });
    }

    const haveId = await Category.findOne({ where: { id } });

    if (!haveId || haveId === null) {
      return response
        .status(404)
        .json({ message: 'There is no relative category in database.' });
    }

    const exists = await Category.findOne({ where: { name } });

    if (exists) {
      return response
        .status(409)
        .json({ message: 'Category name already exists in database.' });
    }

    return next();
  }

  if (method === 'DELETE') {
    if (id === null) {
      return response.status(400).json({ message: 'Missing parameters.' });
    }

    const category = await Category.findOne({ where: { id } });

    if (!category || category === null) {
      return response
        .status(404)
        .json({ message: 'There is no relative category in database.' });
    }

    let product = await Product.findOne({ where: { category_id: id } });

    if (product) {
      product = true;
    } else {
      product = false;
    }

    return next();
  }

  return response
    .status(400)
    .json({ message: 'Missing parameters or incorrect url.' });
};
