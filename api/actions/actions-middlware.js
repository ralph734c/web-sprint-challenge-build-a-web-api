// add middlewares here related to actions

function validateAction(req, res, next) {
  const { project_id, description, notes, completed } = req.body;
  if (!project_id || !description || !notes || typeof completed !== 'boolean') {
    return res.status(400).json({
      message:
        'Bad Request - project_id, description, notes, and completed are required.',
    });
  }
  next();
}

function logger(req, res, next) {
  const { method, originalUrl } = req;
  console.log(`${method} to ${originalUrl} was processed.`);
  next();
}

module.exports = {
  validateAction,
  logger,
};
