var app = angular.module('app', []);

app.controller('mainCtrl', ['$scope', 'list', function($scope, list) {

	list.tasks().then(function (tasks) {
      $scope.tasks = tasks
    } );

  $scope.addTask = function (task){
	task && list.addTask(task).then(function(task) {
		$scope.tasks.push(task);
		$scope.task = null;  
	})
  }

  $scope.removeTask = function (id) {
  	list.removeTask(id).then(function(tasks) {
		$scope.tasks = tasks;
	})
	}

	$scope.changeItemState = function (id, itemState) {
		list.changeItemState(id, itemState)
	}

	$scope.removeChecked = function () {
		list.removeChecked().then(function(tasks){
      $scope.tasks = tasks;
    });
  }
  	$scope.mode = {}
}]);