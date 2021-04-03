import Devolution from '../models/Devolution';
import Sale from '../models/Sale';

export default async (request, response, next) => {
  const { limit, offset, url } = request;

  if (
    url === '/reports/returned_category' ||
    url === '/reports/returned_product' ||
    url === '/reports/returned_reason'
  ) {
    if (limit === null || offset === null) {
      return response.status(400).json({ message: 'Mssing parameters.' });
    }

    const result = await Devolution.findOne();

    if (!result || result === null) {
      return response
        .status(404)
        .json({ message: 'There are no one devolution in database.' });
    }
  }

  if (
    url === '/reports/sold_category' ||
    url === '/reports/sold_product' ||
    url === 'region_seller'
  ) {
    if (limit === null || offset === null) {
      return response.status(400).json({ message: 'Mssing parameters.' });
    }

    const result = await Sale.findOne();

    if (!result || result === null) {
      return response
        .status(404)
        .json({ message: 'There are no one sale in database.' });
    }
  }

  return next();
};
