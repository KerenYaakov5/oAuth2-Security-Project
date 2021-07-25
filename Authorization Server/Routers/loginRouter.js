const { Router } = require('express');
const { loginController } = require('../Controllers/loginController');

const loginRouter = new Router();

loginRouter.post('/login', loginController.login);

module.exports = { loginRouter };
