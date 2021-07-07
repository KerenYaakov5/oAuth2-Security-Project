const { Router } = require('express');
const { oAuthController } = require('../Controllers/oAuthController');

const oAuthRouter = new Router();

oAuthRouter.post('/token', oAuthController.generateAccessToken);

module.exports = { oAuthRouter };
