angular
  .module('app.TeacherFactory', [])
  .factory('TeacherFactory', [function() {

    var socket = io();

    //listens for any updates and will call a function in the teacher.js
    //will also console.log the name from the student object that was submitted
    socket.on("teacher:update", function(data) {
      calculateConfusion(data);
    })

    //START OF SPEECH RECOGNITION CODE
    // new instance of speech recognition
    var recognition = new webkitSpeechRecognition();
    // set params
    recognition.continuous = true;
    recognition.interimResults = true;
    //define
    var speechResults = {};
    var lastLength = 0;

    recognition.onresult = function(event) {
        // delve into words detected results & get the latest
        // total results detected
        var resultsLength = event.results.length - 1;
        // get length of latest results
        var ArrayLength = event.results[resultsLength].length - 1;

        if (event.results[resultsLength][ArrayLength].confidence > .85) {
          var saidWord = event.results[resultsLength][ArrayLength].transcript.split(' ');
          var result = saidWord.slice(lastLength);
          lastLength = saidWord.length;
          speechResults[new Date()] = result;
        }
      }
      //END OF SPEECH RECOGNITION CODE

    return {
      recognition: recognition,
      speechResults: speechResults
    };

  }]);
