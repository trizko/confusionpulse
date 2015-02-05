angular
	  .module('app.StudentFactory', [])
	  .factory('StudentFactory',[ function(){

			var socket = io();

			console.log("getting app.js");

			function connect (){
				socket.on('connect', function(){
					console.log("socket connected");
				});
			
				socket.on('disconnect', function(){
					console.log("socket disconnected");
				});

				socket.on('event', function(data){
					console.log("data: ");
					console.log(data);
				});
			}

			//when someone clicks confused, this function will be called in the controller
			//NOTE: "lectureID" is just hard-coded and should be turned into an input in the
			//same manner as "studentID"
			function confusedStudent (name){
				socket.emit('student:confusion', {
					lectureID: "RECURSION",
					studentID: name
				}); 
				console.log("confusion emitted");
			};

			return {
				connect: connect,
				confusedStudent: confusedStudent
			};
	  	
	  }]);



		
		// document.getElementById('confused').addEventListener('click', function() {
		// 	socket.emit("confusion", {
		// 		lectureID: "RECURSION",
		// 		studentID: "THOMAS"
		// 	}); 
		// 	console.log("I done got clicked.");
		// })

		// socket.on('connect', function(){
		// 	console.log("socket connected");
		// });

		// socket.on('event', function(data){
		// 	console.log("data: ");
		// 	console.log(data);
		// });

		// socket.on('disconnect', function(){
		// 	console.log("socket DISconnected");
		// });
