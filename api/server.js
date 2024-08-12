const express = require('express');
const server = express();
const projectsRouter = require('./projects/projects-router');
const actionsRouter = require('./actions/actions-router');
const { logger } = require('./actions/actions-middlware');

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

server.use(express.json());

server.use(logger);

server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's wire up these APIs, routes, and middleware!</h2>`);
});

module.exports = server;
