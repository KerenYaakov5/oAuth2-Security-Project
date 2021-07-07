const { Router } = require('express');
const { employeesController } = require('./controller');

const employeesRouter = new Router();

employeesRouter.get('/', employeesController.getEmployees);

module.exports = { employeesRouter };
