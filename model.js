var mongoose = require('mongoose');

var schema = mongoose.Schema({
  name: String , 
  checkboxState : Boolean
})
module.exports = db.model('Task', schema)