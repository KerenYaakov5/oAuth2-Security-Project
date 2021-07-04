const { Router } = require('express');
const { blogsController } = require('./controller');

const blogsRouter = new Router();

blogsRouter.post('/token', blogsController.getBlogs);
