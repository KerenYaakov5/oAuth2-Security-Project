const Token = require('../Models/token');

const tokensDataAccess = {    
    saveAccessTokenInDb(accessToken, expiresIn) {
        // update



        // TODO - expiresIn --> validUntil
    
        // console.log(`saveAccessTokenInDb: ${accessToken}`); // TODO - implement when there will be a DB
    },
    async getUserDetails(userId) {
        return await Token.find({userId: userId});
    },
    async saveClientTokensInDb(newToken) {
        return await newToken.save();
    }
}

module.exports = { tokensDataAccess }
