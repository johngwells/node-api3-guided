const express = require('express'); // importing a CommonJS module
const morgan = require('morgan');
const helmet = require('helmet');
const logger = require('./common/logger-middleware');

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

// global middleware
// Morgan gives a response in the log for the: response, status, time
// helmet
server.use(morgan("dev")); // third party, needs to be npm installed
server.use(helmet()); // third party, npm i
// server.use(logger);
server.use(express.json()); // built in middleware: no need to npm i

server.use('/api/hubs', logger, hubsRouter);

// server.use(addName);

server.get('/', addName('Johnny'), logger, (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';
  console.log('req.name', req.name);
  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

function addName(name) {
  return function(req, res, next) {
    req.name = name;
    next();
  }
}

// catch all
server.use(function(req, res, next) {
  res
    .status(404)
    .json({ message: 'Opps, did not find what you are looking for'})
})

module.exports = server;
