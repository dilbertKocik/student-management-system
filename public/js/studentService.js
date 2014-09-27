angular.module('studentService', [])
    .factory('students', ['$http', function($http) {
        return {
            get: function() {
                return $http.get('/api/students');
            },
            createStudent: function(studentName) {
                return $http.post('/api/students/' + studentName);
            },
            deleteStudent: function(studentID) {
                return $http.delete('/api/students/' + studentID);
            },
            updateStudent: function(studentID, newStudentName) {
                return $http.put('/api/students/' + studentID + '/' + newStudentName);
            }
        }
    }]);
