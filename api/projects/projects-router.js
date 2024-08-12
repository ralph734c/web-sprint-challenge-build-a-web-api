// Write your "projects" router here!
const express = require('express');
const projectsModel = require('./projects-model');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    console.log(`${req.method} to ${req.originalUrl}`);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    console.log(
      `${req.method} to ${req.originalUrl} with ID: ${req.params.id}`
    );
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    console.log(`${req.method} to ${req.originalUrl}`);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    console.log(
      `${req.method} to ${req.originalUrl} with ID: ${req.params.id}`
    );
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    console.log(
      `${req.method} to ${req.originalUrl} with ID: ${req.params.id}`
    );
  } catch (error) {
    next(error);
  }
});

router.get('/:id/actions', async (req, res, next) => {
  try {
    console.log(
      `${req.method} to ${req.originalUrl} with ID: ${req.params.id}`
    );
  } catch (error) {
    next(error);
  }
});

router.use((error, req, res, next) => {
  // eslint-disable-line
  res.status(error.status || 500).json({
    customMessage: 'Something bad happened in the projects router',
    message: error.message,
    stack: error.stack,
  });
});

module.exports = router;
