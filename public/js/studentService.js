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
                return $http.delete('/api/students/' + studentName);
            },
            updateStudent: function(updateStudentObj) {
                return $http.put('/api/students', updateStudentObj);
            }
        }
    }]);
