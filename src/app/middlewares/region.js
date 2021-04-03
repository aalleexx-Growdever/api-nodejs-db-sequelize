import { Op } from 'sequelize';
import Region from '../models/Region';
import NearbyRegion from '../models/NearbyRegion';
import Sale from '../models/Sale';
import Stock from '../models/Stock';

export default async (request, response, next) => {
  const { method, url, id, name, limit, offset } = request;

  if (method === 'GET' && url === `/categories/${id}`) {
    if (id === null) {
      return response.status(400).json({ message: 'Missing parameters.' });
    }

    const result = await Region.findOne({ where: { id } });

    if (!result || result === null) {
      return response
        .status(404)
        .json({ message: 'There is no relative region in database.' });
    }

    return next();
  }

  if (method === 'GET') {
    if (limit === null || offset === null) {
      return response.status(400).json({ message: 'Missing parameters.' });
    }

    const result = await Region.findOne();

    if (!result || result === null) {
      return response
        .status(404)
        .json({ message: 'There is no one region in database.' });
    }

    return next();
  }

  if (method === 'POST') {
    if (name === null) {
      return response.status(404).json({ message: 'Missing parameters!' });
    }

    const exists = await Region.findOne({ where: { name } });

    if (exists) {
      return response
        .status(409)
        .json({ message: 'Region name already exists in database.' });
    }

    return next();
  }

  if (method === 'PUT') {
    if (name === null || id === null) {
      return response.status(404).json({ message: 'Missing parameters.' });
    }

    const haveId = await Region.findOne({ where: { id } });

    if (!haveId || haveId === null) {
      return response
        .status(404)
        .json({ message: 'There is no one relative region in database.' });
    }

    const exists = await Region.findOne({ where: { name } });

    if (exists) {
      return response
        .status(409)
        .json({ message: 'Region name already exists in database.' });
    }

    return next();
  }

  if (method === 'DELETE') {
    if (id === null) {
      return response.status(404).json({ message: 'Missing parameters.' });
    }

    const region = await Region.findOne({ where: { id } });

    if (!region || region === null) {
      return response
        .status(404)
        .json({ message: 'There is no relative region in database.' });
    }

    let nearby = await NearbyRegion.findOne({
      where: { [Op.or]: [{ base_region_id: id }, { nearby_region_id: id }] },
    });

    if (nearby) {
      nearby = true;
    } else {
      nearby = false;
    }

    let sale = await Sale.findOne({ where: { region_id: id } });

    if (sale) {
      sale = true;
    } else {
      sale = false;
    }

    let stock = await Stock.findOne({ where: { region_id: id } });

    if (stock) {
      stock = true;
    } else {
      stock = false;
    }

    request.stock = stock;
    request.sale = sale;
    request.nearby = nearby;

    return next();
  }

  return response
    .status(400)
    .json({ message: 'Missing parameters or incorrect url.' });
};
