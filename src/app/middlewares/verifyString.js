export default async (request, response, next) => {
  const { name, description } = request.query;
  let string = '';
  let type = '';

  if (name) {
    string = name;
    type = 'name';
  }
  if (description) {
    string = description;
    type = 'description';
  }

  string.toString();
  const first = string.slice(0, 1).toUpperCase();
  const others = string.slice(1).toLowerCase();
  const parsedString = first + others;

  if (type === 'name') {
    request.name = parsedString;
  }
  if (type === 'description') {
    request.description = parsedString;
  }

  return next();
};
