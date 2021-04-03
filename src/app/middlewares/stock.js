import Stock from '../models/Stock';

export default async (request, response, next) => {
  const {
    method,
    url,
    id,
    productId,
    productQuant,
    regionId,
    limit,
    offset,
  } = request;

  if (method === 'GET' && url === `/stocks/${id}`) {
    if (id === null || limit === null || offset === null) {
      return response.status(400).json({ message: 'Missing parameters.' });
    }
    const result = await Stock.findOne({ where: { region_id: id } });
    if (!result || result === null) {
      return response
        .status(404)
        .json({ message: 'There is no one relative stock in database.' });
    }

    return next();
  }

  if (method === 'GET') {
    if (limit === null || offset === null) {
      return response.status(400).json({ message: 'Missing parameters.' });
    }

    const result = await Stock.findOne();

    if (!result || result === null) {
      return response
        .status(404)
        .json({ message: 'There is no one relative stock in database.' });
    }

    return next();
  }

  if (method === 'POST') {
    if (productId === null || regionId === null || productQuant === null) {
      return response.status(404).json({ message: 'Missing parameters!' });
    }

    return next();
  }

  if (method === 'PUT') {
    if (
      productId === null ||
      regionId === null ||
      id === null ||
      productQuant === null
    ) {
      return response.status(404).json({ message: 'Missing parameters!' });
    }

    const haveId = await Stock.findOne({ where: { id } });

    if (!haveId || haveId === null) {
      return response
        .status(404)
        .json({ message: 'There is no one relative stock in database.' });
    }

    return next();
  }

  if (method === 'DELETE') {
    if (id === null) {
      return response.status(400).json({ message: 'Missing parameters.' });
    }

    const stock = await Stock.findOne({ where: { id } });

    if (!stock || stock === null) {
      return response
        .status(404)
        .json({ message: 'There is no relative stock in database.' });
    }

    return next();
  }

  return response
    .status(400)
    .json({ message: 'Missing parameters or incorrect url.' });
};
