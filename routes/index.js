var express = require('express');
var router = express.Router();
var path = require('path');
var users = require('../models/users');
var mongoose = require('mongoose');
var uri = 'mongodb://localhost/todo';
var checkAuth = require('../middleware/checkAuth');
global.db = mongoose.createConnection(uri);

var sampleTodo = [
  {id : 0, itemState: true, name : 'wake up'},
  { id : 1, itemState: false, name : 'survive'},
  {id : 2, itemState: false, name : 'back to sleep'}
  ];

router.get('/', function (req, res, next) {
	if (req.session.user) {
		res.sendFile(path.join(__dirname, '../public', 'main.html'));
	}else{
		res.redirect('/login')
	}
})

router.get('/login', function (req, res, next) {
	if (!req.session.user) {
		res.sendFile(path.join(__dirname, '../public', 'login.html'));
	}else{
		res.redirect('/');
	}
})

router.post('/logout', function (req, res, next) {
	req.session.destroy();
	res.sendStatus(200);
})

router.post('/loginUser', function (req, res, next) {
/*users.remove({}, function(err) { 
   			console.log('collection removed') 
		});*/
	users.findOne({username : req.body.username}, function (err, user){
		if (user) {
			if (user.password === req.body.password) {
				req.session.user = user._id;
				res.sendStatus(200);
			}else{
				res.sendStatus(403);
			}
		} else {
			users.create({ username : req.body.username, password : req.body.password, todoList : sampleTodo}, function(err, user) {
				if (err) return next(err);
				users.find(function(err, docs) {
					if (err) return next(err);
					req.session.user = user._id;			
					res.sendStatus(200);
				});
			});	
		}
	});
})

router.get('/tasks', checkAuth, function(req, res, next) {
		users.findById(req.session.user, function (err, user){
			res.send(user.todoList);
		});
});

router.post('/addTask', checkAuth, function(req, res, next) {
	users.findById(req.session.user, function (err, user){
		var id = user.todoList.length ?  (user.todoList[user.todoList.length - 1].id + 1) : 0
		var task = {id : id, itemState : false, name : req.body.name};
		user.todoList.push(task);
		res.send(task);
		user.save(function (err) {
        	if(err) {
            console.error('ERROR!');
        	};
    	});
	});
});

router.post('/removeTask', checkAuth, function(req, res, next) {
	users.findById(req.session.user, function (err, user){
		for (var i = user.todoList.length - 1; i >= 0; i--) {
	      	if(user.todoList[i].id === req.body.id){
		        user.todoList.splice(i, 1);
		        user.save(function (err) {
		        	if(err) {
		            	console.error('ERROR!');
		        	};
		    	});
		        res.send(user.todoList);
		        break
	      	};
	    };
	});
});

router.post('/changeItemState', checkAuth, function(req, res, next) {
	users.findOneAndUpdate({_id : req.session.user, 'todoList.id' : req.body.id}, 
	{$set:{'todoList.$.itemState' : req.body.itemState}}, {new: true},
	function(err, doc){
		if(err){
		    console.log("Something wrong when updating data!");
		};
		res.sendStatus(200);
	});
});

router.get('/removeChecked', checkAuth, function(req, res, next) {
	users.findByIdAndUpdate({_id : req.session.user},
		{$pull: {todoList: {itemState : true}}},
		{new: true},
		function(err, doc){
		    if(err){
		        console.log(err);
		    }
		    res.send(doc.todoList);
		}
	)
});
module.exports = router;
