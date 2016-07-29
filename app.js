var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var routes = require('./routes/index');
var session = require('express-session')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));

const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

app.use(session({
	key: 'session',
    secret: 'SUPER SECRET SECRET',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
        url: 'mongodb://localhost/todo',
        touchAfter: 24 * 3600 // time period in seconds
    })

}));
app.use('/', routes);

var server = app.listen(3000, function () {
  console.log('back-end started');
})
module.exports = app;
