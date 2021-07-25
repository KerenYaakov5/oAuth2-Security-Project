const { tokensDataAccess } = require('../DatabaseAccess/tokensDataAccess');

exports.employeesController = {
    getAll(req, res) {
        const userId = req.body.userId;
        if (!userId) {
            res.json("User id can't be empty");
            return;
        }

        const accessToken = req.headers['authorization'];
        if (!accessToken) {
            res.json("Access token is missing");
            return;
        }

        tokensDataAccess.getToken(userId, accessToken)
            .then(tokenObject => validateAccessToken(res, tokenObject[0]))
            .catch(err => console.log(`Error validation access token in db: ${err}`));
    }
};

function validateAccessToken(res, tokenObject) {
    if (!tokenObject) {
        res.status(404).json("Error validation access token in db");
        return;
    }

    const validUntil = tokenObject.validUntil;
    const now = new Date();
    const dateValid = now < validUntil;

    if (dateValid) {
        res.status(200).json("Access token is valid");
    } else {
        res.status(404).json("Access token is invalid");
    }
}
