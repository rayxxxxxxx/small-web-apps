const express = require('express');

const home = express.Router();

home.get('/', (request, response) => {
    response.render('home');
});

home.get('/getContent', (request, response) => {
    response.render('partials/clickLogger', { 'layout': false });
});

module.exports = home;