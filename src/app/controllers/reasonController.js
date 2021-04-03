import Reason from '../models/Reason';
import Devolution from '../models/Devolution';

class ReasonController {
  async index(request, response) {
    const { limit, offset } = request;
    const result = await Reason.findAndCountAll({
      limit,
      offset,
      order: [['description', 'ASC']],
    });

    return response.status(200).json(result);
  }

  async show(request, response) {
    const { id } = request;

    const result = await Reason.findOne({
      where: {
        id,
      },
    });

    return response.status(200).json(result);
  }

  async store(request, response) {
    const { description } = request;

    const result = await Reason.create({
      description,
    });

    return response.status(201).json(result);
  }

  async update(request, response) {
    const { description, id } = request;

    const result = await Reason.update(
      {
        description,
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
    const { id, devolution } = request;

    if (devolution === true) {
      await Devolution.destroy({
        where: {
          reason_id: id,
        },
      });
    }

    await Reason.destroy({
      where: {
        id,
      },
    });

    return response.sendStatus(204);
  }
}

export default new ReasonController();
