const swaggerAutogen = require('swagger-autogen')();

const swaggerConfig = require('./config/swagger');

const outputFile = './src/swagger-documentation.json';
const endpoints = [
  './src/app/routers/categories.js',
  './src/app/routers/devolutions.js',
  './src/app/routers/nearbyRegions.js',
  './src/app/routers/products.js',
  './src/app/routers/reasons.js',
  './src/app/routers/regions.js',
  './src/app/routers/reports.js',
  './src/app/routers/sales.js',
  './src/app/routers/stocks.js',
];

swaggerAutogen(outputFile, endpoints, swaggerConfig);
