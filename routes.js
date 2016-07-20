
var model = require('./model');

exports.tasks = function(req, res, next) {
  model.find(function(err, docs) {
    if (err) return next(err);
    res.send(docs);
  });
};

exports.addTask = function(req, res, next) {
  model.create({ name : req.body.name , checkboxState : false}, function(err, doc) {
    if (err) return next(err);
    res.send(doc);
  });
};

exports.removeTask = function(req, res, next) {
  model.remove({_id:req.body.id}, function(err, doc) {
    if (err) return next(err);
	    model.find(function(err, docs) {
    		if (err) return next(err);
    		res.send(docs);
  		});
  });
};

exports.changeItemState = function(req, res, next) {
	model.findOne({_id : req.body.id}, function (err, doc){
  		doc.checkboxState = !doc.checkboxState;
  		doc.save();
  		res.sendStatus(200);
	});
};

exports.removeChecked = function(req, res, next) {
	model.remove({checkboxState:true}, function (err, doc) {
		if (err) return next(err);
		model.find(function(err, docs) {
			if(err) return next(err);
			res.send(docs)
		})
	})
}