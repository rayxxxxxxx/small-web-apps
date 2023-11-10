const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

dotenv.config();
const COLLECTION_NAME = process.env['COLLECTION_NAME'];

const noteSchema = new Schema({
    'tags': [String],
    'title': String,
    'text': String
});

const noteModel = mongoose.model(COLLECTION_NAME, noteSchema);

module.exports = noteModel;