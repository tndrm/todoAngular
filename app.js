var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

var tasks = [
  {name : 'wake up', checkboxState: true, id : 0},
  {name : 'survive', checkboxState: false, id : 1},
  {name : 'back to sleep', checkboxState: false, id : 2}
  ];

var id = 2;
app.get('/tasks', function (req, res) {
  res.send(tasks);
})

app.post('/addTask', function (req, res) {
  if(typeof req.body.name === 'string'){
    id++
    var task = { name : req.body.name,
            checkboxState : false,
            id : id};
    tasks.push(task);
    res.send(task);
  }else{
    console.log('error');
  }
})

app.post('/removeTask', function (req, res) {
  for (var i = tasks.length - 1; i >= 0; i--) {
    if(tasks[i].id === req.body.id){
      tasks.splice(i, 1);
      res.send(tasks);
    }
  }
})

app.post('/changeItemState', function (req, res) {
  tasks.forEach(function(item, i, arr) {
    if(item.id === req.body.id){
      tasks[i].checkboxState = !tasks[i].checkboxState
        res.sendStatus(200);
    }
  })

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
