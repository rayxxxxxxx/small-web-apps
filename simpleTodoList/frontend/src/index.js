const path = require('path');

const dotenv = require('dotenv');
const express = require('express');
const expressHbs = require('express-handlebars');

const home = require('./routes/home.js');

dotenv.config();
const HOST = process.env['HOST'];
const PORT = parseInt(process.env['PORT']);

const app = express();

app.engine('hbs', expressHbs.engine({
    'layoutsDir': path.resolve('src', 'views', 'layouts'),
    'defaultLayout': 'layout',
    'extname': 'hbs',
    'encoding': 'utf-8'
}));

app.set('views', path.resolve('src', 'views'));
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ 'extended': true }));
app.use('/static', express.static(path.resolve('src', 'static')));
app.use('/home', home);

app.listen(PORT, HOST, () => {
    console.log(`http://${HOST}:${PORT}/`);
});

const gracefulShutdown = () => {
    process.exit(0);
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
process.on('SIGUSR2', gracefulShutdown);