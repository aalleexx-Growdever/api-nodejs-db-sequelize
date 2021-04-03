import Product from '../models/Product';
import Devolution from '../models/Devolution';
import Stock from '../models/Stock';
import Sale from '../models/Sale';

export default async (request, response, next) => {
  const { method, url, id, name, price, categoryId, limit, offset } = request;

  if (method === 'GET' && url === `/products/${id}`) {
    if (id === null) {
      return response.status(400).json({ message: 'Missing parameters.' });
    }

    const result = await Product.findOne({ where: { id } });

    if (!result || result === null) {
      return response
        .status(404)
        .json({ message: 'There is no one relative data in database.' });
    }

    return next();
  }

  if (method === 'GET') {
    if (limit === null || offset === null) {
      return response.status(400).json({ message: 'Missing parameters' });
    }

    const result = await Product.findOne();

    if (!result || result === null) {
      return response
        .status(404)
        .json({ message: 'There is no one relative data in database.' });
    }

    return next();
  }

  if (method === 'POST') {
    if (price === null || categoryId === null || name === null) {
      return response.status(400).json({ message: 'Missing parameters.' });
    }

    const exists = await Product.findOne({ where: { name } });

    if (exists) {
      return response
        .status(409)
        .json({ message: 'Product name already exists in database.' });
    }

    return next();
  }

  if (method === 'PUT') {
    if (id === null || categoryId === null || price === null || name === null) {
      return response.status(400).json({ message: 'Missing parameters.' });
    }

    const haveId = await Product.findOne({ where: { id } });

    if (!haveId || haveId === null) {
      return response
        .status(404)
        .json({ message: 'There is no one relative product in database.' });
    }

    const exists = await Product.findOne({ where: { name } });

    if (exists) {
      return response
        .status(409)
        .json({ message: 'Product name already exists in database.' });
    }

    return next();
  }

  if (method === 'DELETE') {
    if (id === null) {
      return response.status(404).json({ message: 'Missing parameters.' });
    }

    const product = await Product.findOne({ where: { id } });

    if (!product || product === null) {
      return response
        .status(404)
        .json({ message: 'There is no relative product in database.' });
    }

    let stock = await Stock.findOne({ where: { product_id: id } });

    if (stock) {
      stock = true;
    } else {
      stock = false;
    }

    let sale = await Sale.findOne({ where: { product_id: id } });

    if (sale) {
      sale = true;
    } else {
      sale = false;
    }

    let devolution = await Devolution.findOne({ where: { product_id: id } });

    if (devolution) {
      devolution = true;
    } else {
      devolution = false;
    }

    request.sale = sale;
    request.devolution = devolution;
    request.stock = stock;

    return next();
  }

  return response
    .status(400)
    .json({ message: 'Missing parameters or incorrect url.' });
};
