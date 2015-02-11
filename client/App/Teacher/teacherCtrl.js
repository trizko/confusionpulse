angular
  .module('app.TeacherController', [])
  .controller('TeacherController', ['$scope', 'TeacherFactory', function($scope, TeacherFactory) {

    $scope.numStudents = 0;
    $scope.test = 'hello';
    $scope.threshold = false;

    var socket = io();

    socket.on("teacher:addUser", function (data) {
      $scope.numStudents++;
      $scope.$apply();
    });

    socket.on('teacher:threshold', function (data) {
      $scope.threshold = true;
      $scope.$apply();

      setTimeout(function(){
        $scope.threshold = false;
        $scope.$apply();
      },3000);
    });

    $scope.start = function(){
      TeacherFactory.recognition.start();
    }
    $scope.stop = function(){
      TeacherFactory.recognition.stop();
    }
  }])
