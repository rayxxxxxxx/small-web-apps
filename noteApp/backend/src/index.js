const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');

const notes = require('./routes/notes.js');

dotenv.config();
const HOST = process.env['HOST'];
const PORT = parseInt(process.env['PORT']);
const COLLECTION_NAME = process.env['COLLECTION_NAME'];
const MONGODB_PORT = process.env['MONGODB_PORT'];

const app = express();

app.use(cors({
    'origin': ['http://ui:7001', 'https://ui:7001', 'http://localhost:7001', 'https://localhost:7001'],
    'methods': ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
    'allowedHeaders': '*'
}));

app.use(express.json());
app.use('/notes', notes);

app.listen(PORT, HOST, async (err) => {
    if (err) {
        await mongoose.disconnect();
        throw err;
    }
    await mongoose.connect(`mongodb://mongodb:${MONGODB_PORT}/${COLLECTION_NAME}`);
    console.log(`http://${HOST}:${PORT}/`);
});

