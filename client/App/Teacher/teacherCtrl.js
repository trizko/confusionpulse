
angular
	  .module('TeacherController', [])
	  .controller('TeacherController', ['$scope', 'teacherFactory', function($scope, teacherFactory){

      $scope.numStudents = 0;

      setInterval(function () {
        $scope.numStudents = teacherFactory.getCount();
        $scope.$apply();
      }, 1000);
	  }])
