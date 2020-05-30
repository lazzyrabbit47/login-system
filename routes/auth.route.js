const express = require('express');
const Router = express.Router();
const { Register, Login } = require('../services/auth.service');

Router.post('/register',  (req, res, next) => {
    const { username, email, password } = req.body;
    console.log(password)
    Register(username, email, password).then((user) => {
        const {_id, username, email} = user;
        res.send({_id, username, email});
    }).catch((err) => {
        res.send(err)
    });
});

Router.post('/login', (req, res, next) => {
    console.log(req.body)
    const { email, password } = req.body;
    Login(email, password).then((response) => {
        res.json({response: response})
    }).catch((err) => {
        res.send(err)
    })
});

module.exports = Router;