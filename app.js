var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

//Database
var mongoose = require('mongoose');
var uri = 'mongodb://localhost/test';
global.db = mongoose.createConnection(uri);
var routes = require('./routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));




app.get('/tasks', routes.tasks);
app.post('/addTask', routes.addTask);
app.post('/removeTask', routes.removeTask);
app.post('/changeItemState', routes.changeItemState);
app.get('/removeChecked', routes.removeChecked);




var server = app.listen(3000, function () {
  console.log('back-end started');
})

module.exports = app;
