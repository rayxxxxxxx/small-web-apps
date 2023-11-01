const dotenv = require('dotenv');
const express = require('express');

dotenv.config();
const HOST = process.env['HOST'];
const PORT = parseInt(process.env['PORT']);

const tododb = require('./modules/tododb.js');
const todoRouter = require('./routes/todoRoutes.js');

const app = express();

app.use(express.json());
app.use('/todo', todoRouter);

app.get('/', (req, res) => {
    res.send("working...");
});

app.listen(PORT, HOST, () => {
    console.log(`http://${HOST}:${PORT}/`);
});

const gracefulShutdown = () => {
    tododb.db.close((err) => {
        console.log(`[sqlite3] ${err.message}`);
    });
    process.exit(0);
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
process.on('SIGUSR2', gracefulShutdown);