const dotenv = require('dotenv');
const express = require('express');

dotenv.config();
const API_HOST = process.env['API_HOST'];
const API_PORT = parseInt(process.env['API_PORT']);
const API_URL_BASE = `http://${API_HOST}:${API_PORT}`;

const home = express.Router();

home.get('/', async (req, res) => {
    let url = `${API_URL_BASE}/notes`;
    let notes = await fetch(url);
    return res.render('home', { 'notes': await notes.json() });
});

module.exports = home;