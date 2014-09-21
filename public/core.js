var StudentManagementSystem = angular.module('StudentManagementSystem', []);

function mainController($scope, $http) {
    $scope.formData = {};

    $http.get('/api/students')
        .success(function(data) {
            $scope.students = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error getting students: ' + data);
        });

    $scope.createStudent = function() {
        $http.post('/api/students', $scope.formData)
            .success(function(data) {
                $scope.formData = {};
                $scope.students = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error creating student: ' + data);
            });
    };

    $scope.deleteStudent = function(studentName) {
        $http.delete('/api/students/' + studentName)
            .success(function(data) {
                $scope.students = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error deleting student: ' + data);
            });
    };
}
