const express = require("express");
const app = express();
const port = process.env.AUTH_SERVER_PORT || 3000;

const { oAuthRouter } = require("./router");

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/oauth2', oAuthRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something is broken!');
});

app.listen(port, () => console.log(`Authorization server is running on port ${port}`));
