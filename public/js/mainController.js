angular.module('studentController', ['ui.bootstrap', 'dialogs'])
    .controller('mainController', ['$scope', '$http', '$dialogs', 'students', function($scope, $http, $dialogs, students) {
        $scope.formData = {};
        $scope.loading = true;

        students.get()
            .success(function(data) {
                $scope.students = data;
                $scope.loading = false;
            });

        $scope.createStudent = function() {
            $scope.loading = true;

            if ($scope.formData.studentName != undefined) {
                students.createStudent($scope.formData)
                    .success(function(data) {
                        $scope.loading = false;
                        $scope.formData = {};
                        $scope.students = data;
                    });
            }
        };

        $scope.deleteStudent = function(studentName) {
            $scope.loading = true;

            dlg = $dialogs.confirm('Please Confirm','Are you sure you want to permanently delete ' + studentName + '?');
            dlg.result.then(function(btn) {
                students.deleteStudent(studentName)
                    .success(function(data) {
                        $scope.students = data;
                    });
            }, function(btn) {
            });

            $scope.loading = false;
        };

        $scope.updateStudent = function(currentStudentName, newStudentName) {
            $scope.loading = true;

            if (newStudentName != undefined) {
                var updateStudentObj = { "currentStudentName": currentStudentName, "newStudentName": newStudentName };
                students.updateStudent(updateStudentObj)
                    .success(function(data) {
                        $scope.loading = false;
                        $scope.newStudentName = "";
                        $scope.students = data;
                    });
            }
        };
    }]);
