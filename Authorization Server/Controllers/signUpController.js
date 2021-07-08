// const jwt = require('jsonwebtoken');
// const consts = require('../Helpers/constants');
// const { SECRET } = consts;

// exports.signUpController = {
//     signUp(req, res) {
//         const userId = req.params.id;

//         const token = jwt.sign({ id: userId }, SECRET, {
//             expiresIn: 3600 /* expires in an hour */
//         }); 
//         res.status(200).send({ auth: true, token: token });
//     }
// };