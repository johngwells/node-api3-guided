const express = require('express'); // importing a CommonJS module
const morgan = require('morgan');
const helmet = require('helmet');

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

// global middleware
server.use(morgan("dev")); // third party, needs to be npm installed
server.use(helmet()); // third party, npm i
server.use(logger);
server.use(express.json()); // built in middleware: no need to npm i

server.use('/api/hubs', hubsRouter);

server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

function logger(req, res, next) {
  // log information about the request to the console -> GET to /
  const method = req.method;
  const endpoint = req.originalUrl;

  console.log(`${method} to ${endpoint}`);

  next(); // moves the request to the next midddleware
}

module.exports = server;
