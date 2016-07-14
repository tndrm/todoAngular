var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

var tasks = [
  {name : 'wake up', checkboxState: true},
  {name : 'survive', checkboxState: false},
  {name : 'back to sleep', checkboxState: false}
  ];

app.get('/tasks', function (req, res) {
  res.send(tasks);
})

app.post('/addTask', function (req, res) {
  tasks.push(req.body);
  res.sendStatus(200)
})

app.post('/removeTask', function (req, res) {
  tasks.splice(req.body.itemIndex, 1)
  res.sendStatus(200)
})

app.post('/changeChecboxState', function (req, res) {
  for (id in tasks) {
    if (tasks[id].name == req.body.name) tasks[id].checkboxState = !tasks[id].checkboxState
  }
  res.sendStatus(200)
})

app.get('/removeChecked', function (req, res) {
  tasks = tasks.filter(function(task) {
    return !task.checkboxState
  })
  res.send(tasks);
})

var server = app.listen(3000, function () {
  console.log('back-end started');
})

module.exports = app;
