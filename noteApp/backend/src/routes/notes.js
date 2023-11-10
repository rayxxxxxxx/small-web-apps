const express = require('express');

const noteModel = require('../mongodb/noteModel.js');

const notes = express.Router();

notes.get('/tags', async (req, res) => {
    if (Object.keys(req.query).length == 0) {
        return res.status(404).end();
    }
    let data = await noteModel.find({
        tags: { '$all': Object.values(req.query).sort() }
    });
    return res.json(data);
});

notes.get('/:noteId', async (req, res) => {
    let data = await noteModel.findOne({
        '_id': req.params.noteId
    });
    return res.json(data);
});

notes.get('/', async (req, res) => {
    let data = await noteModel.find();
    return res.json(data);
});

notes.post('/', async (req, res) => {
    req.body['tags'] = req.body['tags'].sort();
    let note = new noteModel(req.body);
    await note.save();

    return res.status(200).end();
});

notes.put('/:noteId', async (req, res) => {
    await noteModel.updateOne(
        {
            '_id': req.params.noteId
        },
        {
            '$set':
            {
                'tags': req.body['tags'].sort(),
                'title': req.body['title'],
                'text': req.body['text']
            }
        });
    return res.status(200).end();
});

notes.delete('/:noteId', async (req, res) => {
    await noteModel.deleteOne({
        _id: req.params.noteId
    });
    return res.status(200).end();
});

module.exports = notes;
