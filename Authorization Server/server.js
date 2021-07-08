const express = require("express");
const app = express();
const port = process.env.AUTH_SERVER_PORT || 3000;

// const { signUpRouter } = require("./Routers/signUpRouter");
const { loginRouter } = require("./Routers/loginRouter");
const { oAuthRouter } = require("./Routers/oAuthRouter");
const { userRouter } = require("./Routers/userRouter");
const { authMiddleware } = require("./Helpers/authMiddleware");

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-Access-Token');
    res.set('Content-Type', 'application/json');
    next();
});

function verifyUser(req, res, next) {
    authMiddleware.verifyConnectedUser(req, res, next);
};

app.use('/api/oauth2', verifyUser, oAuthRouter); 
app.use('/api/users', verifyUser, userRouter);
// app.use('/api/signUp', signUpRouter);
app.use('/api/login', loginRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something is broken!');
});

app.listen(port, () => console.log(`Authorization server is running on port ${port}`));
