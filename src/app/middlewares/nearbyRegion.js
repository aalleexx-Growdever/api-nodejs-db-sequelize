import { Op } from 'sequelize';
import NearbyRegion from '../models/NearbyRegion';

export default async (request, response, next) => {
  const {
    method,
    url,
    id,
    baseRegionId,
    nearbyRegionId,
    limit,
    offset,
  } = request;

  if (method === 'GET' && url === `/nearby_regions/${id}`) {
    if (id === null || limit === null || offset === null) {
      return response.status(400).json({ message: 'Missing parameters.' });
    }

    const result = await NearbyRegion.findOne({
      where: { base_region_id: id },
    });

    if (!result || result === null) {
      return response
        .status(404)
        .json({ message: 'There is no one relative data in database.' });
    }

    return next();
  }

  if (method === 'GET') {
    if (limit === null || offset === null) {
      return response.status(400).json({ message: 'Missing parameters.' });
    }

    const result = await NearbyRegion.findOne();

    if (!result || result === null) {
      return response
        .status(404)
        .json({ message: 'There is no one relative data in database.' });
    }

    return next();
  }

  if (method === 'POST') {
    if (baseRegionId === null || nearbyRegionId === null) {
      return response.status(400).json({ message: 'Missing parameters.' });
    }

    const exists = await NearbyRegion.findOne({
      where: {
        [Op.and]: [
          { base_region_id: baseRegionId },
          { nearby_region_id: nearbyRegionId },
        ],
      },
    });

    if (exists) {
      return response
        .status(409)
        .json({ message: 'Data already exists in database.' });
    }

    return next();
  }

  if (method === 'PUT') {
    if (id === null || baseRegionId === null || nearbyRegionId === null) {
      return response.status(400).json({ message: 'Missing parameters.' });
    }

    const haveId = await NearbyRegion.findOne({
      where: { id },
    });

    if (!haveId || haveId === null) {
      return response
        .status(404)
        .json({ message: 'There is no one relative data in database.' });
    }

    const exists = await NearbyRegion.findOne({
      where: {
        [Op.and]: [
          { base_region_id: baseRegionId },
          { nearby_region_id: nearbyRegionId },
        ],
      },
    });

    if (exists) {
      return response
        .status(409)
        .json({ message: 'Data already exists in database.' });
    }

    return next();
  }

  if (method === 'DELETE') {
    if (id === null) {
      return response.status(400).json({ message: 'Missing parameters.' });
    }

    const nearbyRegion = await NearbyRegion.findOne({ where: { id } });

    if (!nearbyRegion || nearbyRegion === null) {
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
