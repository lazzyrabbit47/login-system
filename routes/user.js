const express = require('express');
const Router = express.Router();

Router.get('/', (req, res) => {
    res.send('<h2>root file was accessed</h2>');
    console.log('root route was accessed')
})

module.exports =  Router;