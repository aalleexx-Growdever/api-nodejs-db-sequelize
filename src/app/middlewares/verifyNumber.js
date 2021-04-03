import Region from '../models/Region';
import Category from '../models/Category';
import Product from '../models/Product';
import Reason from '../models/Reason';

export default async (request, response, next) => {
  const { id } = request.params;
  const {
    baseRegionId,
    nearbyRegionId,
    price,
    categoryId,
    productQuant,
    quantity,
    productId,
    regionId,
    reasonId,
  } = request.query;

  request.id = parseInt(id, 10);
  request.baseRegionId = parseInt(baseRegionId, 10);
  request.nearbyRegionId = parseInt(nearbyRegionId, 10);
  request.price = parseFloat(price);
  request.categoryId = parseInt(categoryId, 10);
  request.productQuant = parseInt(productQuant, 10);
  request.quantity = parseInt(quantity, 10);
  request.productId = parseInt(productId, 10);
  request.regionId = parseInt(regionId, 10);
  request.reasonId = parseInt(reasonId, 10);

  if (baseRegionId) {
    const result = await Region.findOne({
      where: { id: request.baseRegionId },
    });

    if (!result || result === null) {
      return response
        .status(404)
        .json({ message: 'There is no one relative base region in database.' });
    }
  }

  if (nearbyRegionId) {
    const result = await Region.findOne({
      where: { id: request.nearbyRegionId },
    });

    if (!result || result === null) {
      return response.status(404).json({
        message: 'There is no one relative nearby region in database.',
      });
    }
  }

  if (categoryId) {
    const result = await Category.findOne({
      where: { id: request.categoryId },
    });

    if (!result || result === null) {
      return response
        .status(404)
        .json({ message: 'There is no one relative category in database.' });
    }
  }

  if (productId) {
    const result = await Product.findOne({
      where: { id: request.productId },
    });

    if (!result || result === null) {
      return response
        .status(404)
        .json({ message: 'There is no one relative product in database.' });
    }
  }

  if (regionId) {
    const result = await Region.findOne({
      where: { id: request.regionId },
    });

    if (!result || result === null) {
      return response
        .status(404)
        .json({ message: 'There is no one relative region in database.' });
    }
  }

  if (reasonId) {
    const result = await Reason.findOne({
      where: { id: request.reasonId },
    });

    if (!result || result === null) {
      return response
        .status(404)
        .json({ message: 'There is no one relative reason in database.' });
    }
  }

  return next();
};
