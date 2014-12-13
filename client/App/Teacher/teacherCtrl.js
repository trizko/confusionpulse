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

    var thresholdTimestamp = [];
    var confusingSpeech = [];

    var socket = io();

    socket.on("teacher:addUser", function (data) {
      $scope.numStudents++;
      $scope.$apply();
    });

    socket.on('teacher:threshold', function (data) {
      console.log(data);
      thresholdTimestamp.push(data.time);

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
        var isInThreshold = false;
        for(var i =0; i < thresholdTimestamp.length; i++){
          var difference = new Date(thresholdTimestamp[i]) - new Date(timestamp);
          console.log('DIFF:',difference);
          if(difference < 5000 && difference > -1000){
            isInThreshold = true;
          }
        }
        if(isInThreshold){
          confusingSpeech.push(['<span class="emphasize">']);
        }
        confusingSpeech.push(TeacherFactory.speechResults[timestamp]);
        if(isInThreshold){
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
      jQuery('.result').append('<div>' + confusedSpeechIntoString.join(' ') + '</div>'); 
    }
  }])
