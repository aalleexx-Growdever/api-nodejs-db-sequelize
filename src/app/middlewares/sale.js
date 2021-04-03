import Sale from '../models/Sale';
import Product from '../models/Product';

export default async (request, response, next) => {
  const {
    method,
    url,
    id,
    productId,
    quantity,
    regionId,
    limit,
    offset,
  } = request;

  if (method === 'GET' && url === `/sales/${id}`) {
    if (id === null) {
      return response.status(400).json({ message: 'Mising parameters.' });
    }

    const result = await Sale.findOne({ where: { product_id: id } });

    if (!result || result === null) {
      return response
        .status(404)
        .json({ message: 'There is no one relative sale in database.' });
    }

    return next();
  }

  if (method === 'GET') {
    if (limit === null || offset === null) {
      return response.status(400).json({ message: 'Missing parameters.' });
    }

    const result = await Sale.findOne();

    if (!result || result === null) {
      return response
        .status(404)
        .json({ message: 'There is no one sale in database.' });
    }

    return next();
  }

  if (method === 'POST') {
    if (productId === null || quantity === null || regionId === null) {
      return response.status(404).json({ message: 'Missing parameters!' });
    }

    const product = await Product.findOne({ where: { id: productId } });

    const { price } = product;
    const category = product.category_id;

    const total = parseFloat(price) * quantity;

    request.total = total;
    request.category = category;

    return next();
  }

  if (method === 'PUT') {
    if (
      productId === null ||
      quantity === null ||
      regionId === null ||
      id === null
    ) {
      return response.status(404).json({ message: 'Missing parameters!' });
    }

    const haveId = await Sale.findOne({ where: { id } });

    if (!haveId || haveId === null) {
      return response
        .status(404)
        .json({ message: 'There is no one relative sale in database.' });
    }

    const product = await Product.findOne({ where: { id: productId } });

    const { price } = product;

    const total = parseFloat(price) * quantity;

    request.total = total;

    return next();
  }

  if (method === 'DELETE') {
    if (id === null) {
      return response.status(400).json({ message: 'Missing parameters.' });
    }

    const sale = await Sale.findOne({ where: { id } });

    if (!sale || sale === null) {
      return response
        .status(404)
        .json({ message: 'There is no relative sale in database.' });
    }

    return next();
  }

  return response
    .status(400)
    .json({ message: 'Missing parameters or incorrect url.' });
};
