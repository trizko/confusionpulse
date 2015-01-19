angular
  .module('TeacherController', [])
  .controller('TeacherController', ['$scope', 'teacherFactory', function($scope, teacherFactory) {

    $scope.numStudents = 0;

    setInterval(function() {
      $scope.numStudents = teacherFactory.getCount();
      $scope.$apply();
    }, 1000);

    //TODO: MAKE BUTTON TO START TRANSCRIPTION USING THIS METHOD
    teacherFactory.recognition.start();
    //TODO: MAKE BUTTON TO STOP TRANSCRIPTION USING THIS METHOD
    teacherFactory.recognition.stop();
  }])
