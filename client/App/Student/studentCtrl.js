angular
	  .module('StudentController', [])
	  .controller('StudentController', ['$scope', 'studentFactory', 'authFactory', function($scope, studentFactory, authFactory){

		studentFactory.connect();

	    //references the existing object in the authFactory so that it can grab the value entered
	    //by the student in the login page
	    $scope.student = authFactory;
	    $scope.clicked = false;
	    $scope.clickedStyle = {};

	    $scope.confusedStudent = function() {
			studentFactory.confusedStudent ($scope.student.studentName);
				$scope.clicked = true;
				$scope.clickedStyle = {
					opacity: 0.5
				}
				setTimeout(function () {
					$scope.clickedStyle = {
						opacity: 1
					}
					$scope.clicked = false;
					$scope.$apply();
				}, 5000)   	
	    }
	  
	  }])

