const tokensDataAccess = {    
    saveAccessTokenInDb(accessToken, expiresIn) {
        // TODO - expiresIn --> validUntil
    
        // console.log(`saveAccessTokenInDb: ${accessToken}`); // TODO - implement when there will be a DB
    },
    async saveClientTokensInDb(newToken) {
        return await newToken.save();
    }
}

module.exports = { tokensDataAccess }
