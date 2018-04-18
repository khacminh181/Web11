import { userInfo } from "os";

const express = require("express");
const router = express.Router();

const authController = require('./controller');

router.post("/", (req, res) => {
    authController.login(req)
        .then(userInfo => {
            req.session.userInfo = userInfo;
            res.send("Logged in.")
        })
        .catch(err => res.status(500).send(err));
});

router.delete('/', (req, res) => {
    req.session.destroy();
    res.send("Logged out");
});