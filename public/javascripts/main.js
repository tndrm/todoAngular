var app = angular.module('app', []);
app.controller('mainCtrl', ['$scope', 'list', function($scope, list) {

	list.get(function(data){
		$scope.tasks = data;
    });
    
    $scope.logout = function () {
      list.logout()  
    }

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

  	$scope.changeItemState = function (id, itemState) {
  		list.changeItemState(id, itemState)
  	}

  	$scope.removeChecked = function () {
  		list.removeChecked(function(data){
  			$scope.tasks = data;
	    });
	  }

  	$scope.mode = {}
}]);
	
app.service('list', ['$http', function( $http){
    this.get = function(callback){
      $http.get('http://localhost:3000/tasks').success(function(data) {
      callback(data);
      }).error(function (err) {
        if (err == 401) {
          window.location = "/login"
        }else{
          throw err
        }  
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

    this.changeItemState = function (id, itemState) {
  		$http.post('http://localhost:3000/changeItemState', {'id' : id, 'itemState': itemState})
  	};
  	this.removeChecked = function (callback) {
  		$http.get('http://localhost:3000/removeChecked').success(function(data) {
          callback(data);
      }).error(function (err) {
        throw err
      });
    }
    this.logout = function (callback) {
      return $http.post('http://localhost:3000/logout').success(function() {
          window.location = "/login"
        }).error(function (err) {
          throw err        
      });
    }

}]);
