angular
  .module('teacherFactory', [])
  .factory('teacherFactory',[ function(){

		var socket = io();

		var uniqueStudents = [];
		var getCount = function () {
			return uniqueStudents.length;
		}

		//listens for any updates and will call a function in the teacher.js
		//will also console.log the name from the student object that was submitted
		socket.on("teacher:update", function(data){
		    calculateConfusion(data);
		    if (_.indexOf(uniqueStudents, data.studentID) === -1) {
		    	uniqueStudents.push(data.studentID);
		    }
		})

		return {
			getCount: getCount
		};

	}]);
