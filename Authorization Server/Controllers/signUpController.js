const jwt = require('jsonwebtoken');
const consts = require('../Helpers/constants');
const { SECRET } = consts;

exports.signUpController = {
    signUp(req, res) {
        const userId = req.params.id;

        const token = jwt.sign({ id: userId }, SECRET, {
            expiresIn: 86400 /* expires in 24 hours */
        }); 
        res.status(200).send({ auth: true, token: token });
    }
};