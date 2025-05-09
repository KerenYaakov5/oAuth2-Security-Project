const { helper } = require('../Helpers/helper');
const { tokensDataAccess } = require('../DatabaseAccess/tokensDataAccess');

exports.oAuthController = {
    generateAccessToken(req, res) {
        const grantType = req.body.grantType;
        if (!grantType || grantType !== "client_credentials") {
            res.json("Grant type is incorrect");
            return;
        }

        const userId = req.body.userId;
        if (!userId) {
            res.json("User Id can't be empty");
            return;
        }

        const clientCredentials = req.body.clientCredentials;
        if (!clientCredentials) {
            res.json("Client credentials can't be empty");
            return;
        }

        const clientKeys = helper.decodeClientCredentials(clientCredentials);
        if (!clientKeys) {
            res.json("Error decoding Client credentials string");
            return;
        }

        tokensDataAccess.getUserDetails(userId)
            .then(user => generateAccessTokenForUser(res, user, clientKeys))
            .catch(err => res.json(`Error getting user credentials from db: ${err}`));
    },
    generateClientId() {
        return helper.generateToken(16);
    },
    generateClientSecret() {
        return helper.generateToken(32);
    }
};

function getExpiresInValue() {
    return 5*60; // In seconds
}

function generateAccessTokenForUser(res, user, clientKeys) {
    if (user && user[0].clientId == clientKeys.clientId && user[0].clientSecret == clientKeys.clientSecret) {
        const accessToken = helper.generateToken(28);
        const expiresIn = getExpiresInValue(); 

        accessTokenResponse = {
            access_token: accessToken,
            expires_in: expiresIn
        }

        tokensDataAccess.saveAccessTokenInDb(user[0], accessToken, expiresIn, clientKeys)
            .then(() => res.json(accessTokenResponse))
            .catch(err => res.json(`Error saving access token in db: ${err}`))
    } else {
        res.json({access_token: "", expires_in: ""});
    }
}
