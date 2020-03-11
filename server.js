const express = require('express'); // importing a CommonJS module
const morgan = require('morgan');

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

// global middleware
server.use(morgain("dev")); // third party, needs to be npm installed
server.use(express.json()); // built in middleware: no need to npm i

server.use(express.json());

server.use('/api/hubs', hubsRouter);

server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

module.exports = server;
