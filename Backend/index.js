const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const config = require('./config.json');

const app = express();

const imageRouter = require('./modules/api/images/route');
const userRouter = require('./modules/api/users/route');

app.use(
    session({
        secret: config.sessionSecrect,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: config.secureCookie,
            maxAge: 12 * 60 * 60 * 1000
        }
    })
);

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/images', imageRouter);
app.use('/api/users', userRouter);

app.get("/", (req, res) => {
    res.send("OK");
});

mongoose.connect(config.mongoPath, (err) => {
    if (err) console.error(err);
    else console.log("Database connect successful");
});

const port = process.env.port || 6969;

app.listen(port, err => {
    if (err) console.log(err);
    console.log("Server started at port " + port);
});