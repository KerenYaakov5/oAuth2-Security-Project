const bcrypt = require('bcryptjs');
const { usersDataAccess } = require('../DatabaseAccess/usersDataAccess');
const { tokensDataAccess } = require('../DatabaseAccess/tokensDataAccess');
const { oAuthController } = require('./oAuthController');
const User = require('../Models/user');
const Token = require('../Models/token');

exports.userController = {
    generateClientKey(req, res) { // TODO - implement
        res.json("generateClientKey");
    },
    getAllUsers(req, res) { 
        usersDataAccess.getAllUsers()
            .then(users => res.json(users))
            .catch(err => console.log(`Error getting the users from db: ${err}`));
    },
    getUserDetails(req, res) {
        const userId = req.params.id;

        usersDataAccess.getUserDetails(userId)
            .then(user => { res.json(user[0])})
            .catch(err => console.log(`Error getting user details from db: ${err}`));
    },
    getUserById(req, res) {
        const userId = req.params.id;

        usersDataAccess.getUserById(userId)
            .then(user => res.json(user))
            .catch(err => console.log(`Error getting user from db: ${err}`));
    },
    addUser(req, res) { 
        const newUser = new User({ 
            userName: req.body.userName,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userLevel: req.body.userLevel,
            password: bcrypt.hashSync(req.body.password, 8)
        });

        usersDataAccess.addUser(newUser)
            .then(addUserResult => { 
                if (addUserResult) {
                    const userTokens = new Token({
                        userId: addUserResult._id,
                        clientId: oAuthController.generateClientId(),
                        clientSecret: oAuthController.generateClientSecret()
                    });

                    tokensDataAccess.saveClientTokensInDb(userTokens).
                        then(addClientTokenResult => {
                            if (addClientTokenResult) {
                                usersDataAccess.getUserById(addUserResult._id)
                                    .then(user => res.json(user));
                            } else {
                                res.status(404).send(`Error creating client tokens: ${addClientTokenResult}`);
                            }
                        });
                } else {
                    res.status(404).send(`Error saving a user: ${newUser}`);
                }
            })
            .catch(err => console.log(`Error saving a user to db: ${err}`));
    },
    updateUser(req, res) {
        const userId = req.params.id;

        const updatedUser = new User({ 
            userName: req.body.userName,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userLevel: req.body.userLevel,
            password: bcrypt.hashSync(req.body.password, 8)
        });

        usersDataAccess.updateUser(userId, updatedUser)
            .then(result => { 
                if (result) {
                    usersDataAccess.getUserById(userId)
                        .then(user => res.json(user));
                } else {
                    res.status(404).send(`Error updating a user: ${updatedUser}`);
                }
            })
            .catch(err => console.log(`Error updating user in db: ${err}`));
    },
    deleteUser(req, res) {
        const userId = req.params.id;

        usersDataAccess.deleteUser(userId)
            .then(result => res.json(result))
            .catch(err => console.log(`Error deleting user from db: ${err}`));
    }
};
