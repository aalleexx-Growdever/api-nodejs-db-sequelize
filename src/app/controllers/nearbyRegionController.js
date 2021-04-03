import NearbyRegion from '../models/NearbyRegion';

class NearbyRegionController {
  async index(request, response) {
    const { limit, offset } = request;

    const result = await NearbyRegion.findAndCountAll({
      limit,
      offset,
      order: [['base_region_id', 'ASC']],
    });

    return response.status(200).json(result);
  }

  async show(request, response) {
    const { id, limit, offset } = request;

    const result = await NearbyRegion.findAndCountAll({
      where: {
        base_region_id: id,
      },
      limit,
      offset,
    });

    return response.status(200).json(result);
  }

  async store(request, response) {
    const { baseRegionId, nearbyRegionId } = request;

    const result = await NearbyRegion.create({
      base_region_id: baseRegionId,
      nearby_region_id: nearbyRegionId,
    });

    return response.status(201).json(result);
  }

  async update(request, response) {
    const { id, baseRegionId, nearbyRegionId } = request;

    const result = await NearbyRegion.update(
      {
        base_region_id: baseRegionId,
        nearby_region_id: nearbyRegionId,
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
    const { id } = request;

    await NearbyRegion.destroy({
      where: {
        id,
      },
    });

    return response.sendStatus(204);
  }
}

export default new NearbyRegionController();
