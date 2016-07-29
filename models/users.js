var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://localhost/todo');

Schema = mongoose.Schema;
var schema = mongoose.Schema({
  username: {
  	unique: true,
  	type: String, 
  	required: true
  }, 
  password : {
  	type: String, 
  	required: true
  },
  todoList : { 
  	type : Array , 
  	"default" : [] }
});
module.exports = db.model('todo', schema)