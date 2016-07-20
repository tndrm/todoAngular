var mongoose = require('mongoose');

var schema = mongoose.Schema({
  name: String , 
  itemState : Boolean
})
module.exports = db.model('Task', schema)