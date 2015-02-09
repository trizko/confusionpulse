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

    $scope.start = function(){
      TeacherFactory.recognition.start();
    }
    $scope.stop = function(){
      TeacherFactory.recognition.stop();
    }
  }])
