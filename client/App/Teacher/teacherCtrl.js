angular
  .module('app.TeacherController', [])
  .controller('TeacherController', ['$scope', 'TeacherFactory', function($scope, TeacherFactory) {

    $scope.numStudents = 0;
    $scope.test = 'hello';
    var socket = io();

    socket.on("teacher:addUser", function (data) {
      $scope.numStudents++;
      $scope.$apply();
    })

    //TODO: MAKE BUTTON TO START TRANSCRIPTION USING THIS METHOD
    TeacherFactory.recognition.start();
    //TODO: MAKE BUTTON TO STOP TRANSCRIPTION USING THIS METHOD
    TeacherFactory.recognition.stop();
  }])
