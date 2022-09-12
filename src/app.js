const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');

// Settings
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Routes
app.use(require('./routes/index'));
app.use('/api/preguntas',require('./routes/preguntas'));

// Statics
app.use(express.static(path.join(__dirname, 'public')));

// 404 hundle
app.use((req, res, next) => {
    res.status(404).redirect('/404-ERROR');
});

module.exports = app;