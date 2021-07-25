const { Router } = require('express');
const { employeesController } = require('../Controllers/employeesController');

const employeesRouter = new Router();

employeesRouter.post('', employeesController.getAll); // Need to fix method

module.exports = { employeesRouter };