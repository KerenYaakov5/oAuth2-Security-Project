const User = require('../Models/user');
const Token = require('../Models/token');

exports.usersDataAccess = {
    validateClientKeys(clientKeys) { // TODO
        // TODO - implement when there will be a DB + user id 

        // console.log(`validateClientKeys - clientId: ${clientKeys.clientId},  clientSecret: ${clientKeys.clientSecret}`);

        return true;
    },
    async getAllUsers() {
        return await User.find({});
    },
    async getUserById(userId) {
        return await User.find({_id: userId});
    },
    async getUserDetails(userId) {
        return await Token.find({userId: userId});
    },
    async addUser(newUser) {
        return await newUser.save();
    },
    async updateUser(userId, updatedUser) {
        return await User.updateOne(
            {_id: userId},
            {             
                userName: updatedUser.userName,
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                userLevel: updatedUser.userLevel,
                password: updatedUser.password
            });
    },
    async deleteUser(userId) {
        return await User.deleteOne({_id: userId});
    },
    async getUserByUsername(username) {
        return await User.find({userName: username});
    }
}
