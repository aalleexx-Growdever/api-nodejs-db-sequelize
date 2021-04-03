require('dotenv').config();

const host = process.env.API_URL;

module.exports = {
  info: {
    version: '1.0.0',
    title: 'Desafio Growdev',
    description: 'Desafio Growdev',
  },
  host,
  basePath: '/',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  defaultModelsExpandDepth: -1,
  securityDefinitions: {},
  definitions: {},
};
