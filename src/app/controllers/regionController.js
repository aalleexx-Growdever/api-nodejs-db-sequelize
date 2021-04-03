import { Op } from 'sequelize';
import Region from '../models/Region';
import Sale from '../models/Sale';
import Stock from '../models/Stock';
import NearbyRegion from '../models/NearbyRegion';

class RegionController {
  async index(request, response) {
    const { limit, offset } = request;

    const result = await Region.findAndCountAll({ limit, offset });

    return response.status(200).json(result);
  }

  async show(request, response) {
    const { id } = request;

    const result = await Region.findOne({
      where: {
        id,
      },
    });

    return response.status(200).json(result);
  }

  async store(request, response) {
    const { name } = request;

    const result = await Region.create({
      name,
    });

    return response.status(201).json(result);
  }

  async update(request, response) {
    const { name, id } = request;

    const result = await Region.update(
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
    const { id, sale, stock, nearby } = request;

    if (nearby === true) {
      await NearbyRegion.destroy({
        where: {
          [Op.or]: [{ base_region_id: id }, { nearby_region_id: id }],
        },
      });
    }

    if (stock === true) {
      await Stock.destroy({
        where: {
          region_id: id,
        },
      });
    }

    if (sale === true) {
      await Sale.destroy({
        where: {
          region_id: id,
        },
      });
    }

    await Region.destroy({
      where: {
        id,
      },
    });

    return response.sendStatus(204);
  }
}

export default new RegionController();
