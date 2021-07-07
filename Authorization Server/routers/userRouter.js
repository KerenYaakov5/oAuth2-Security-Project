const { Router } = require('express');
const { userController } = require('../Controllers/userController');

const userRouter = new Router();

userRouter.post('generate-key', userController.generateClientKey);

module.exports = { userRouter };
