var app = angular.module('app', []);
app.controller('mainCtrl', ['$scope', 'list', function($scope, list) {

	list.get(function(data){
		$scope.tasks = data;
    });

    $scope.addTask = function (task){
		list.addTask(task).then(function(data) {
			$scope.tasks.push(data.data);
			$scope.task = null;  
		})
    }

    $scope.removeTask = function (id) {
    	list.removeTask(id).then(function(data) {
			$scope.tasks = data.data;
		})
  	}

  	$scope.changeItemState = function (id) {
  		list.changeItemState(id)
  	}

  	$scope.removeChecked = function () {
		list.removeChecked(function(data){
			$scope.tasks = data;
	    });
	  	}

  	$scope.mode = {}
}]);
	
app.service('list', ['$http', function($http){
    this.get = function(callback){
          $http.get('http://localhost:3000/tasks').success(function(data) {
          callback(data);
        });
    };

    this.addTask = function(task){
      if (task) {
        return $http.post('http://localhost:3000/addTask', task)
      };
    }

    this.removeTask = function (id){
    	return $http.post('http://localhost:3000/removeTask', {'id' : id})
    };

    this.changeItemState = function (id) {
  		$http.post('http://localhost:3000/changeItemState', {'id' : id})
  	};
  	this.removeChecked = function (callback) {
  		 $http.get('http://localhost:3000/removeChecked').success(function(data) {
          callback(data);
        });
  	}
}]);