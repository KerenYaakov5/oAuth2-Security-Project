const { Router } = require('express');
const { oAuthController } = require('./controller');

const oAuthRouter = new Router();

oAuthRouter.post('/token', oAuthController.generateAccessToken);

module.exports = { oAuthRouter };
