const { Router } = require('express');
const { signUpController } = require('../Controllers/signUpController');

const signUpRouter = new Router();

signUpRouter.post('/:id', signUpController.signUp);

module.exports = { signUpRouter };