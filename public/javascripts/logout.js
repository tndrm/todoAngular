app.controller('logout', function($http, $scope) {
	$scope.logout = function () {
		$http.post('http://localhost:3000/logout').then(function() {
			window.location = "/login"
		}, function (err) {
			throw err
		});
	}
});