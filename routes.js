
var model = require('./model');

exports.tasks = function(req, res, next) {
  model.find(function(err, docs) {
    if (err) return next(err);
    res.send(docs);
  });
};

exports.addTask = function(req, res, next) {
  model.create({ name : req.body.name , itemState : false}, function(err, doc) {
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
  		doc.itemState = !doc.itemState;
  		doc.save();
  		res.sendStatus(200);
	});
};

exports.removeChecked = function(req, res, next) {
	model.remove({itemState:true}, function (err, doc) {
		if (err) return next(err);
		model.find(function(err, docs) {
			if(err) return next(err);
			res.send(docs)
		})
	})
}