var app = angular.module('app', []);
app.controller('mainCtrl', function ($http, $scope) {
	$http.get('http://localhost:3000/tasks')
		.success(function (result) {
			console.log('sucess', result);
			$scope.tasks = result;
		})
		.error(function (result) {
			console.log('error');
		})
	$scope.addTask = function (task) {
		if(task){
			task.checkboxState = false;
			$http.post('http://localhost:3000/addTask', task)
				.success(function (result) {
					console.log('task posted', result);
					$scope.tasks.push(task);
					$scope.task = null;
				})
				.error(function (result) {
					console.log('error in post');
				})
		}
	}
	$scope.removeTask = function (item) {
		console.log($scope.tasks)
		var itemIndex = $scope.tasks.indexOf(item);
		$http.post('http://localhost:3000/removeTask', {'itemIndex' : itemIndex})
			.success(function (result) {
				console.log('task removed', result);
				$scope.tasks.splice(itemIndex, 1);
			})
			.error(function (result) {
				console.log('error in post');
			})
  	}
  	$scope.changeChecboxState = function (item) {
  		/*item.checkboxState = !item.checkboxState*/
  		console.log(item)
  		$http.post('http://localhost:3000/changeChecboxState', item)
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
			console.log('checked removed');
			$scope.tasks = result;
		})
		.error(function (result) {
			console.log('removeChecked error');
		})
  	}
  	$scope.mode = {}
});