const jwt = require('jsonwebtoken');
const consts = require('../Helpers/constants');
const { SECRET } = consts;

exports.authMiddleware = {
    verifyConnectedUser(req, res, next) {
        const token = req.headers['x-access-token'];

        if (!token) {
            res.status(401).send({auth: false, message: "Need to login"});
        } else {
            jwt.verify(token, SECRET, (err, decoded) => {
                if (!err) {
                //    console.log("id: " + decoded); // { id: '60e6a2e4ba1e5fa298be8a02', iat: 1625735903, exp: 1625822303 }

                    next();
                } else {
                //    console.log("err: " + err);

                    return res.status(500).send({ auth: false, message: 'Failed to authenticate token' });
                }
            });
        }
    }
};
