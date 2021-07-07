const { Router } = require('express');
const { oAuthController } = require('../controllers/oAuthController');

const oAuthRouter = new Router();

oAuthRouter.post('/token', oAuthController.generateAccessToken);

module.exports = { oAuthRouter };
