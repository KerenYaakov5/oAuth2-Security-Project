const { Router } = require('express');
const { employeesController } = require('../Controllers/employeesController');

const employeesRouter = new Router();

employeesRouter.get('/', employeesController.getEmployees);

module.exports = { employeesRouter };
