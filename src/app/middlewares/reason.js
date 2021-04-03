import Reason from '../models/Reason';
import Devolution from '../models/Devolution';

export default async (request, response, next) => {
  const { method, url, id, description, limit, offset } = request;

  if (method === 'GET' && url === `/reasons/${id}`) {
    if (id === null) {
      return response.status(400).json({ message: 'Missing parameters.' });
    }

    const result = await Reason.findOne({ where: { id } });

    if (!result || result === null) {
      return response
        .status(404)
        .json({ message: 'There is no one relative reason in database.' });
    }

    return next();
  }

  if (method === 'GET') {
    if (limit === null || offset === null) {
      return response.status(400).json({ message: 'Missing parameters.' });
    }

    const result = await Reason.findOne();

    if (!result || result === null) {
      return response
        .status(404)
        .json({ message: 'There is no one reason in database.' });
    }

    return next();
  }

  if (method === 'POST') {
    if (description === null) {
      return response.status(404).json({ message: 'Missing parameters!' });
    }

    const exists = await Reason.findOne({ where: { description } });

    if (exists) {
      return response
        .status(409)
        .json({ message: 'Reason description already exists in database.' });
    }

    return next();
  }

  if (method === 'PUT') {
    if (description === null || id === null) {
      return response.status(404).json({ message: 'Missing parameters!' });
    }

    const haveId = await Reason.findOne({ where: { id } });

    if (!haveId || haveId === null) {
      return response
        .status(404)
        .json({ message: 'There is no one relative reason in database.' });
    }

    const exists = await Reason.findOne({ where: { description } });

    if (exists) {
      return response
        .status(409)
        .json({ message: 'Reason description already exists in database.' });
    }

    return next();
  }

  if (method === 'DELETE') {
    if (id === null) {
      return response.status(400).json({ message: 'Missing parameters.' });
    }

    const reason = await Reason.findOne({ where: { id } });

    if (!reason || reason === null) {
      return response
        .status(404)
        .json({ message: 'There is no relative reason in database.' });
    }

    let devolution = await Devolution.findOne({ where: { reason_id: id } });

    if (devolution) {
      devolution = true;
    } else {
      devolution = false;
    }

    request.devolution = devolution;

    return next();
  }

  return response
    .status(400)
    .json({ message: 'Missing parameters or incorrect url.' });
};
