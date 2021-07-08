const bcrypt = require('bcryptjs');
const { usersDataAccess } = require('../DatabaseAccess/usersDataAccess');

exports.loginController = {
    login(req, res) {
        const username = req.body.username;
        const password = req.body.password;

        if (!username || !password) {
            res.json("User details can't be empty");
        } else { 
            usersDataAccess.getUserByUsername(username)
                .then(user => comparePasswords(res, user, password))
                .catch(err => console.log(`Error searching for user in db: ${err}`));
        }
    }
};

function comparePasswords(res, user, password) {
    if (!user || !user[0]) {
        res.status(404).json(false); 
    }

    bcrypt.compare(password, user[0].password).then((exists) => {
        if (exists) {
            res.json({"userId": user[0]._id});
        } else {
            res.status(404).json(false);
        }
    });
}
