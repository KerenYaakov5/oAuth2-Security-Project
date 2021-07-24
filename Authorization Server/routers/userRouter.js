const { Router } = require('express');
const { userController } = require('../Controllers/userController');

const userRouter = new Router();

userRouter.post('generate-key', userController.generateClientKey);

// For testing purpose, check later if needed 
userRouter.get('/', userController.getAllUsers);                    // localhost:3000/api/users 
userRouter.get('/:id', userController.getUserById);                 // localhost:3000/api/users/{id}
userRouter.get('/:id/details', userController.getUserDetails);      // localhost:3000/api/users/{id}/details
userRouter.post('/', userController.addUser);                       // localhost:3000/api/users
userRouter.put('/:id', userController.updateUser);                  // localhost:3000/api/users/{id}
userRouter.delete('/:id', userController.deleteUser);               // localhost:3000/api/users/{id}

module.exports = { userRouter };
