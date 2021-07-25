const Token = require('../Models/token');

const tokensDataAccess = {    
    async saveAccessTokenInDb(user, accessToken, expiresIn, clientKeys) {
        const validUntil = new Date();
        validUntil.setSeconds(validUntil.getSeconds() + expiresIn);

        return await Token.updateOne(
            { userId: user.userId },
            {             
                clientId: clientKeys.clientId,
                clientSecret: clientKeys.clientSecret,
                accessToken: accessToken,
                validUntil: validUntil
            });
    },
    async getToken(userId, accessToken) {
        return await Token.find({userId: userId, accessToken: accessToken});
    },
    async getUserDetails(userId) {
        return await Token.find({userId: userId});
    },
    async saveClientTokensInDb(newToken) {
        return await newToken.save();
    }
}

module.exports = { tokensDataAccess }
