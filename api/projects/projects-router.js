// Write your "projects" router here!
const express = require('express');
const projectsModel = require('./projects-model');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    console.log(`${req.method} to ${req.originalUrl}`);
    const projects = await projectsModel.get();
    if (projects) {
      res.status(200).json(projects);
    } else {
      res.status(200).json([]);
    }
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    console.log(`${req.method} to ${req.originalUrl} with ID: ${id}`);
    const project = await projectsModel.get(id);

    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({
        message: `A project with ID: ${id} was not found, try again!`,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    console.log(`${req.method} to ${req.originalUrl}`);
    const { name, description } = req.body;
    if (name && description && name.trim() && description.trim()) {
      const newProject = await projectsModel.insert(req.body);
      res.status(201).json(newProject);
    } else {
      res.status(400).json({
        message:
          'Bad Request - Creating a new project requires the name and description',
      });
    }
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    console.log(
      `${req.method} to ${req.originalUrl} with ID: ${req.params.id}`
    );
    const { name, description, completed } = req.body;
    const id = req.params.id;
    if (
      name &&
      description &&
      typeof completed === 'boolean' &&
      name.trim() &&
      description.trim()
    ) {
      const updatedProject = await projectsModel.update(id, req.body);
      if (updatedProject) {
        res.status(201).json(updatedProject);
      } else {
        res.status(404).json({
          message: `A project with ID: ${id} was not found, try again!`,
        });
      }
    } else {
      res.status(400).json({
        message:
          'Bad Request - Updating a project requires the name, description, and completed values',
      });
    }
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    console.log(
      `${req.method} to ${req.originalUrl} with ID: ${req.params.id}`
    );
    const projectToDelete = await projectsModel.remove(id);

    if (projectToDelete) {
      res.sendStatus(204);
    } else {
      res.status(404).json({
        message: `A project with ID: ${id} was not found, try again!`,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.get('/:id/actions', async (req, res, next) => {
  const { id } = req.params;
  try {
    console.log(
      `${req.method} to ${req.originalUrl} with ID: ${req.params.id}`
    );
    const projActions = await projectsModel.getProjectActions(id);
    if (projActions) {
      res.status(200).json(projActions);
    } else {
      res
        .status(404)
        .json(`A project with ID: ${id} was not found, try again!`);
    }
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
