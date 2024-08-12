// Write your "actions" router here!
const express = require('express');
const actionsModel = require('./actions-model');
const projectsModel = require('../projects/projects-router');
const { validateAction } = require('./actions-middlware');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const actions = await actionsModel.get();
    res.status(200).json(actions);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const action = await actionsModel.get(id);

    if (action) {
      res.status(200).json(action);
    } else {
      res.status(404).json({
        message: `An Action with ID: ${id} was not found, try again!`,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  const { project_id, description, notes } = req.body;
  try {
    const projectExists = await projectsModel.get(project_id);
    if (projectExists) {
      if (description && notes && description.trim() && notes.trim()) {
        const newAction = await actionsModel.insert(req.body);
        res.status(201).json(newAction);
      } else {
        res.status(400).json({
          message: 'Bad Request - A description and notes are required.',
        });
      }
    } else {
      res.status(404).json({
        message: `A project with ID ${project_id} doesn't exist and an existing project is required to create an action`,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.put('/:id', validateAction, async (req, res, next) => {
  const { id } = req.params;
  try {
    const actionExists = await actionsModel.get(id);
    if (actionExists) {
      const updatedAction = await actionsModel.update(id, req.body);
      res.status(200).json(updatedAction);
    } else {
      res.status(404).json({
        message: `An action with ID ${id} could not be found`,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const actionToDelete = await actionsModel.remove(id);

    if (actionToDelete) {
      res.sendStatus(204);
    } else {
      res.status(404).json({
        message: `An action with ID: ${id} was not found, try again!`,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.use((error, req, res, next) => { // eslint-disable-line
  res.status(error.status || 500).json({
    customMessage: 'Something bad happened in the actions router',
    message: error.message,
    stack: error.stack,
  });
});

module.exports = router;
