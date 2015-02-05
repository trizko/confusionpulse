angular.module('app', [
  'ui.router',
  'app.StudentController',
  'app.StudentFactory',
  'app.TeacherController',
  'app.TeacherFactory',
  'app.AuthController', 
  'app.AuthFactory'
])


.config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
  
  $stateProvider
  
  .state('auth', {
    url: '/',
    templateUrl: 'App/Auth/login.html',
    controller: 'AuthController'
  })

  .state('student', {
    url: '/student',
    templateUrl: 'App/Student/student.html',
    controller: 'StudentController'
  })
  
  .state('teacher', {
    url: '/teacher',
    templateUrl: 'App/Teacher/teacher.html',
    controller: 'TeacherController'
  });
  
  $urlRouterProvider.otherwise('/');

})