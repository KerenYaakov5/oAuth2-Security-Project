const express = require("express");
const app = express();
const port = process.env.RESOURCE_SERVER_PORT || 3001;

const { blogsRouter } = require("./router");

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/blog', blogsRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something is broken!');
});

app.listen(port, () => console.log(`Resource server is running on port ${port}`));
