const User = require('../Models/user');

exports.usersDataAccess = {
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
