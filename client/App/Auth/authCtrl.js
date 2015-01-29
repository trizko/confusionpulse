angular
  .module('app.AuthController', [])
  .controller('AuthController', ['$scope', 'AuthFactory', function($scope, AuthFactory) {
  	//refers to the object in authFactory for both the studentName and createName
  	$scope.student = AuthFactory;
  }]);