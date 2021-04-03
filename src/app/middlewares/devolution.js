import Devolution from '../models/Devolution';
import Product from '../models/Product';

export default async (request, response, next) => {
  const {
    method,
    url,
    id,
    productId,
    quantity,
    reasonId,
    limit,
    offset,
  } = request;

  if (method === 'GET' && url === `/devolution/${id}`) {
    if (id === null || limit === null || offset === null) {
      return response.status(404).json({ message: 'Missing parameters.' });
    }

    const result = await Devolution.findOne({
      where: { product_id: id },
    });

    if (!result || result === null) {
      return response
        .status(404)
        .json({ message: 'There is no one relative devolution in database.' });
    }

    return next();
  }

  if (method === 'GET') {
    if (limit === null || offset === null) {
      return response.status(400).json({ message: 'Missing parameters' });
    }
    const result = await Devolution.findOne();

    if (!result || result === null) {
      return response
        .status(404)
        .json({ message: 'There is no one devolution in database.' });
    }

    return next();
  }

  if (method === 'POST') {
    if (productId === null || quantity === null || reasonId === null) {
      return response.status(404).json({ message: 'Missing parameters.' });
    }

    const product = await Product.findOne({ where: { id: productId } });

    request.category = product.category_id;

    return next();
  }

  if (method === 'PUT') {
    if (
      productId === null ||
      quantity === null ||
      reasonId === null ||
      id === null
    ) {
      return response.status(404).json({ message: 'Missing parameters.' });
    }

    const exists = await Devolution.findOne({ where: { id } });

    if (!exists || exists === null) {
      return response
        .status(404)
        .json({ message: 'There is no one relative data in database.' });
    }

    const product = await Product.findOne({ where: { id: productId } });

    request.category = product.category_id;

    return next();
  }

  if (method === 'DELETE') {
    if (id === null) {
      return response.status(404).json({ message: 'Missing parameters.' });
    }

    const devolution = await Devolution.findOne({ where: { id } });

    if (!devolution || devolution === null) {
      return response
        .status(404)
        .json({ message: 'There is no relative data in database.' });
    }

    return next();
  }

  return response
    .status(400)
    .json({ message: 'Missing parameters or incorrect url.' });
};
