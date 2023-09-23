const path = require('path');

const dotenv = require('dotenv');
const express = require('express');
const expressHandlebars = require('express-handlebars');

const home = require('./routes/home.js');

const app = express();

app.engine('hbs', expressHandlebars.engine({
    'layoutsDir': path.resolve('src', 'views', 'layouts'),
    'partialsDir': path.resolve('src', 'views', 'partials'),
    'extname': 'hbs',
    'encoding': 'utf-8'
}));

app.set('view engine', 'hbs');
app.set('views', path.resolve('src', 'views'));

app.use('/static', express.static(path.resolve('src', 'static')));
app.use('/home', home);

dotenv.config();
const HOST = process.env['HOST'];
const PORT = process.env['PORT'];

app.listen(PORT, HOST, () => {
    console.log(`http://${HOST}:${PORT}/home`);
});