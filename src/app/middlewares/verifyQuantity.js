import { Op } from 'sequelize';
import Stock from '../models/Stock';
import NearbyRegion from '../models/NearbyRegion';

export default async (request, response, next) => {
  const { productId, quantity, regionId } = request;
  let quantityLeft = null;
  let nearbyCounter = 0;
  let stockCounter = 0;
  let firstNearby = null;
  const stockDelete = [];

  async function getNearby(regionBase, counter) {
    const baseRegion = regionBase;
    let result = null;

    if (counter === 0) {
      const region = await NearbyRegion.findOne({
        where: { base_region_id: baseRegion },
      });

      result = region.nearby_region_id;
      firstNearby = result;
    }

    if (counter === 1) {
      const region = await NearbyRegion.findOne({
        where: {
          base_region_id: baseRegion,
          nearby_region_id: { [Op.ne]: firstNearby },
        },
      });

      if (!region || region === null) {
        return response
          .status(404)
          .json({ message: 'Sorry! The product is out of stock.' });
      }

      result = region.nearby_region_id;
    }

    return result;
  }

  async function getStock(region, counter) {
    const idRegion = region;
    let result = null;

    if (stockDelete.length > 0) {
      result = await Stock.findOne({
        where: {
          [Op.and]: [{ product_id: productId }, { region_id: idRegion }],
          id: { [Op.notIn]: stockDelete },
        },
      });
    } else {
      result = await Stock.findOne({
        where: {
          [Op.and]: [{ product_id: productId }, { region_id: idRegion }],
        },
      });
    }

    if ((!result || result === null) && counter === 0) {
      const nearby = await getNearby(regionId, nearbyCounter);
      stockCounter += 1;

      return getStock(nearby, stockCounter);
    }

    if ((!result || result === null) && counter === 1) {
      nearbyCounter += 1;
      const nearby = await getNearby(regionId, nearbyCounter);

      if (!nearby || nearby === null) {
        return response
          .status(404)
          .json({ message: 'Sorry! The product is out of stock.' });
      }

      stockCounter += 1;
      return getStock(nearby, stockCounter);
    }

    if ((!result || result === null) && counter === 2) {
      return response.status(404).json({
        message: 'Sorry! The product is out of stock.',
      });
    }

    return result;
  }

  async function trySale(stock, saleQuantity) {
    let quant = null;

    if (stock.product_quant >= saleQuantity) {
      quant = stock.product_quant - saleQuantity;

      if (quant === 0) {
        stockDelete.push(stock.id);
      } else {
        await Stock.update(
          {
            product_id: productId,
            product_quant: quant,
            region_id: stock.region_id,
          },
          {
            where: {
              id: stock.id,
            },
          }
        );
      }

      if (stockDelete) {
        stockDelete.forEach((item) => {
          Stock.destroy({ where: { id: item } });
        });
      }

      return next();
    }

    if (stock.product_quant < saleQuantity) {
      quant = saleQuantity - stock.product_quant;
      stockDelete.push(stock.id);
    }

    return quant;
  }

  async function verifySale(value, region) {
    const stock = await getStock(region, stockCounter);
    quantityLeft = await trySale(stock, value);

    if (quantityLeft > 0) {
      await verifySale(quantityLeft, regionId);
    }
  }

  verifySale(quantity, regionId);
};
