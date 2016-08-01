/*
for start database:
C:\Program Files\MongoDB\Server\3.2\bin
mongod --dbpath d:\DEV\todoAngular\data\


mongo
use todos*/

var express = require('express');
const mongoose = require('mongoose');
var uri = 'mongodb://localhost/todos';
global.db = mongoose.createConnection(uri);
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


const MongoStore = require('connect-mongo')(session);

app.use(session({
	key: 'session',
    secret: 'SUPER SECRET SECRET',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
        url: 'mongodb://localhost/todos'
    })

}));


app.use('/', routes);

var server = app.listen(3000, function () {
  console.log('back-end started');
})
module.exports = app;
