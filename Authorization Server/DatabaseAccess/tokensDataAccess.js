const tokensDataAccess = {
    saveAccessTokenInDb(accessToken, expiresIn) {
        // TODO - expiresIn --> validUntil
    
        console.log(`saveAccessTokenInDb: ${accessToken}`); // TODO - implement when there will be a DB
    }
}

module.exports = { tokensDataAccess }
