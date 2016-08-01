app.service('list', ['$http', function( $http){
  this.tasks = function(){
    return $http.get('http://localhost:3000/tasks').then(function(tasks) {
    return tasks.data;
    }, function (err) {
      if (err == 401) {
        window.location = "/login"
      } else {
        throw err
      }  
    });
  };

  this.addTask = function(task){
      return $http.post('http://localhost:3000/addTask', task)
      .then(function(task) {
      return task.data;
    })
  }

  this.removeTask = function (id){
  	return $http.post('http://localhost:3000/removeTask', {'id' : id})
    .then(function(tasks) {
      return tasks.data;
    })
  };

  this.changeItemState = function (id, itemState) {
		$http.post('http://localhost:3000/changeItemState', {'id' : id, 'itemState': itemState})
  };
  this.removeChecked = function () {
    return $http.get('http://localhost:3000/removeChecked')
    .then(function(tasks) {
      return tasks.data;
    })
  }
}]);
