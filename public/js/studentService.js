angular.module('studentService', [])
    .factory('students', ['$http', function($http) {
        return {
            get: function() {
                return $http.get('/api/students');
            },
            createStudent: function(studentName) {
                return $http.post('/api/students/' + studentName);
            },
            deleteStudent: function(studentName) {
                return $http.delete('/api/students/' + studentName);
            },
            updateStudent: function(currentStudentName, newStudentName) {
                return $http.put('/api/students/' + currentStudentName + '/' + newStudentName);
            }
        }
    }]);
