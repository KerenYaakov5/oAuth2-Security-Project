const { helper } = require('../Helpers/helper');
const { settingsDataAccess } = require('../DatabaseAccess/settingsDataAccess');
const { tokensDataAccess } = require('../DatabaseAccess/tokensDataAccess');

exports.oAuthController = {
    generateAccessToken(req, res) {
        const grantType = req.body.grantType;
        if (!grantType || grantType !== "client_credentials") {
            res.json("Grant type is incorrect");
        }

        const clientCredentials = req.body.clientCredentials;
        if (!clientCredentials) {
            res.json("Client credentials can't be empty");
        }

        helper.validateClientCredentials(clientCredentials);
        const accessToken = helper.generateAccessTokenForUser();
        const expiresIn = settingsDataAccess.getExpiresInValue();
        tokensDataAccess.saveAccessTokenInDb(accessToken, expiresIn);

        const accessTokenResponse = {
            access_token: accessToken,
            expires_in: expiresIn
        }

        res.json(accessTokenResponse);
    }
};
