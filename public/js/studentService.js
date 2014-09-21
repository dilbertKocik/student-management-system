angular.module('studentService', [])
    .factory('students', ['$http', function($http) {
        return {
            get: function() {
                return $http.get('/api/students');
            },
            createStudent: function(studentData) {
                return $http.post('/api/students', studentData);
            },
            deleteStudent: function(studentName) {
                return $http.deleteStudent('/api/students/' + studentName);
            }
        }
    }]);
