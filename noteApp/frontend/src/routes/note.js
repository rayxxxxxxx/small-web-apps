const dotenv = require('dotenv');
const express = require('express');

dotenv.config();
const API_HOST = process.env['API_HOST'];
const API_PORT = parseFloat(process.env['API_PORT']);
const API_URL_BASE = `http://${API_HOST}:${API_PORT}`;

const note = express.Router();

note.get('/:noteId', async (req, res) => {
    let url = `${API_URL_BASE}/notes/${req.params.noteId}`;
    let responce = await fetch(url);
    let noteData = await responce.json();
    noteData['tags'] = noteData['tags'].join(' ');
    return res.render('note', noteData);
});

module.exports = note;