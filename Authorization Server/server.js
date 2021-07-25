const express = require("express");
const app = express();
const port = process.env.AUTH_SERVER_PORT || 3000;

const { loginRouter } = require("./Routers/loginRouter");
const { oAuthRouter } = require("./Routers/oAuthRouter");
const { userRouter } = require("./Routers/userRouter");
const { employeesRouter } = require("./Routers/employeesRouter");
const { authMiddleware } = require("./Helpers/authMiddleware");

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-Access-Token, X-Auth-Token, Authorization');
    res.set('Content-Type', 'application/json');

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    next();
});

function verifyUser(req, res, next) {
    authMiddleware.verifyConnectedUser(req, res, next);
};

app.use('/api/oauth2', verifyUser, oAuthRouter); 
app.use('/api/users', verifyUser, userRouter);
app.use('/api/employees', verifyUser, employeesRouter);
app.use('/api', loginRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something is broken!');
});

app.listen(port, () => console.log(`Authorization server is running on port ${port}`));
