const User = require('../Models/user');

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
                userLevel: updatedUser.userLevel
            });
    },
    async deleteUser(userId) {
        return await User.deleteOne({_id: userId});
    }
}
