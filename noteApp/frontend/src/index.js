const path = require('path');
const dotenv = require('dotenv');
const express = require('express');
const expressHandlebars = require('express-handlebars');

const home = require('./routes/home.js');
const note = require('./routes/note.js');

dotenv.config();
const HOST = process.env['HOST'];
const PORT = parseInt(process.env['PORT']);

const app = express();

app.engine('hbs', expressHandlebars.engine({
    'layoutsDir': path.resolve(__dirname, 'views', 'layouts'),
    'defaultLayout': 'layout',
    'extname': 'hbs'
}));

app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'views'));

app.use(express.json());
app.use('/static', express.static(path.resolve(__dirname, 'static')));
app.use('/home', home);
app.use('/note', note);

app.listen(PORT, HOST, async (err) => {
    if (err) {
        throw err;
    }
    console.log(`http://${HOST}:${PORT}/`);
});

