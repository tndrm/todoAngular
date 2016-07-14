var app = angular.module('app', []);
app.controller('mainCtrl', function ($http, $scope) {
	$http.get('http://localhost:3000/tasks')
		.success(function (result) {
			$scope.tasks = result;
		})
		.error(function (result) {
			console.log('error');
		})
	$scope.addTask = function (task) {
		if(task){
			$http.post('http://localhost:3000/addTask', task)
				.success(function (result) {
					$scope.tasks.push(result);
					$scope.task = null;
				})
				.error(function (result) {
					console.log('error in post');
				})
		}
	}
	$scope.removeTask = function (id) {
		$http.post('http://localhost:3000/removeTask', {'id' : id})
			.success(function (result) {
				$scope.tasks = result;
			})
			.error(function (result) {
				console.log('error in post');
			})
  	}
  	$scope.changeChecboxState = function (id) {
  		$http.post('http://localhost:3000/changeItemState', {'id' : id})
			.success(function (result) {
				console.log('Checbox chenged', result);
			})
			.error(function (result) {
				console.log('error in changeChecbox');
			})
  	}
  	$scope.removeChecked = function () {
  		$http.get('http://localhost:3000/removeChecked')
		.success(function (result) {
			$scope.tasks = result;
		})
		.error(function (result) {
			console.log('removeChecked error');
		})
  	}
  	$scope.mode = {}
});