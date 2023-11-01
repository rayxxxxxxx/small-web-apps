const dotenv = require('dotenv');
const express = require('express');

const home = express.Router();

dotenv.config();
const API_HOST = process.env['API_HOST'];
const API_PORT = parseInt(process.env['API_PORT']);
const API_ORIGIN = `http://${API_HOST}:${API_PORT}`;


home.get('/', async (req, res) => {
    let url = API_ORIGIN + '/todo/getall';
    let prom = await fetch(url);
    let todos = await prom.json();
    return res.render('home', { 'todos': todos });
});

home.post('/add', async (req, res) => {
    let url = API_ORIGIN + '/todo/add'
    await fetch(url, {
        'method': 'POST',
        'headers': {
            'Content-Type': 'application/json'
        },
        'body': JSON.stringify(req.body)
    });
    return res.redirect('back');
});

home.get('/delete/:todoUUID', async (req, res) => {
    let url = API_ORIGIN + `/todo/delete/${req.params.todoUUID}`;
    await fetch(url);
    return res.redirect('back');
});

module.exports = home;