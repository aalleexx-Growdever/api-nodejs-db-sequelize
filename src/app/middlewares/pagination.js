export default async (request, response, next) => {
  const { page, limit } = request.query;

  if (!page || page === null || !limit || limit === null) {
    return response.status(400).json({
      message: 'Missing params.',
    });
  }

  request.limit = parseInt(limit, 10);
  request.page = parseInt(page, 10);
  request.offset = request.limit * (request.page - 1);

  return next();
};
