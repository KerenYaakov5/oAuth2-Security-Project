const { helper } = require('../Helpers/helper');
const { settingsDataAccess } = require('../DatabaseAccess/settingsDataAccess');
const { tokensDataAccess } = require('../DatabaseAccess/tokensDataAccess');
const { usersDataAccess } = require('../DatabaseAccess/usersDataAccess');

exports.oAuthController = {
    generateAccessToken(req, res) { // TODO - continue
        const grantType = req.body.grantType;
        if (!grantType || grantType !== "client_credentials") {
            res.json("Grant type is incorrect");
        }

        const clientCredentials = req.body.clientCredentials;
        if (!clientCredentials) {
            res.json("Client credentials can't be empty");
        }

        const clientKeys = helper.decodeClientCredentials(clientCredentials);
        if (!clientKeys) {
            res.json("Error decoding Client credentials string");
        }
        
        const areClientKeysValid = usersDataAccess.validateClientKeys(clientKeys);
        if (!areClientKeysValid) {
            res.json("Client keys are invalid");
        }

        const accessToken = helper.generateToken(28);

        // TODOs 
        const expiresIn = settingsDataAccess.getExpiresInValue(); 
        tokensDataAccess.saveAccessTokenInDb(accessToken, expiresIn);

        const accessTokenResponse = {
            access_token: accessToken,
            expires_in: expiresIn
        }

        res.json(accessTokenResponse);
    },
    generateClientId() {
        return helper.generateToken(16);
    },
    generateClientSecret() {
        return helper.generateToken(32);
    }
};
