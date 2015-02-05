angular
	  .module('app.StudentController', [])
	  .controller('StudentController', ['$scope', 'StudentFactory', 'AuthFactory', function($scope, StudentFactory, AuthFactory){

		StudentFactory.connect();

	    //references the existing object in the authFactory so that it can grab the value entered
	    //by the student in the login page
	    $scope.student = AuthFactory;
	    $scope.buttonMessage = 'Please Clarify';
	    $scope.clicked = false;
	    $scope.clickedStyle = {};

	    $scope.confusedStudent = function() {
			StudentFactory.confusedStudent($scope.student.studentName);
			//disables button for 5 seconds
			$scope.buttonMessage = '';
			$scope.clicked = true;
			$scope.clickedStyle = {
				opacity: 0.3
			}
			setTimeout(function () {
				$scope.clickedStyle = {
					opacity: 1
				}
				$scope.buttonMessage = 'Please Clarify'
				$scope.clicked = false;
				$scope.$apply();
			}, 5000)   	
    }
  
  }])

