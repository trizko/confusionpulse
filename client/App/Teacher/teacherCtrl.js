angular
  .module('app.TeacherController', [])
  .controller('TeacherController', ['$scope', 'TeacherFactory', function($scope, TeacherFactory) {

    var load_script = function () {
      var script = document.createElement('script');
      script.src = 'teacher.js';
      document.body.appendChild(script);
    }

    load_script();

    $scope.numStudents = 0;
    $scope.test = 'hello';
    $scope.threshold = false;
    $scope.transcribedText = '';

    var thresholdTimestamp;
    var confusingSpeech = [];

    var socket = io();

    socket.on("teacher:addUser", function (data) {
      $scope.numStudents++;
      $scope.$apply();
    });

    socket.on('teacher:threshold', function (data) {
      thresholdTimestamp = data;

      $scope.threshold = true;
      $scope.$apply();

      setTimeout(function(){
        $scope.threshold = false;
        $scope.$apply();
      },3000);
    });

    $scope.testButton = function(){
      socket.emit('threshold', new Date());
    };

    $scope.start = function(){
      TeacherFactory.recognition.start();
    }
    $scope.stop = function(){
      TeacherFactory.recognition.stop();
      for(var timestamp in TeacherFactory.speechResults){
        var difference = new Date(thresholdTimestamp) - new Date(timestamp);
        if(difference < 5000 && difference > -1000){
          confusingSpeech.push(['<span class="emphasize">']);
        }
        confusingSpeech.push(TeacherFactory.speechResults[timestamp]);
        if(difference < 5000 && difference > -1000){
          confusingSpeech.push(['</span>']);
        }
      }
      var confusedSpeechIntoString = [];
      for(var i = 0; i < confusingSpeech.length; i++) {
        var subArray = confusingSpeech[i];
        for (var j = 0; j < subArray.length; j++) {
          confusedSpeechIntoString.push(subArray[j]);
        }
      }
      $scope.transcribedText = confusedSpeechIntoString.join(' ');
    }
  }])
