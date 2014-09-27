angular.module('studentController', ['ui.bootstrap', 'dialogs'])
    .controller('mainController', ['$scope', '$http', '$dialogs', 'students', function($scope, $http, $dialogs, students) {
        $scope.formData = {};
        $scope.loading = true;

        students.get()
            .success(function(data) {
                $scope.students = data;
                $scope.loading = false;
            });

        $scope.createStudent = function(newStudentName) {
            $scope.loading = true;

            if (newStudentName != undefined) {
                students.createStudent(newStudentName)
                    .success(function(data) {
                        $scope.loading = false;
                        $scope.formData = {};
                        $scope.students = data;
                    });
            }
        };

        $scope.deleteStudent = function(studentID, studentName) {
            $scope.loading = true;

            dlg = $dialogs.confirm('Please Confirm','Are you sure you want to permanently delete ' + studentName + '?');
            dlg.result.then(function(btn) {
                students.deleteStudent(studentID)
                    .success(function(data) {
                        $scope.students = data;
                    });
            }, function(btn) {
            });

            $scope.loading = false;
        };

        $scope.updateStudent = function(studentID, newStudentName) {
            $scope.loading = true;

            if (newStudentName != undefined) {
                var updateStudentObj = { "studentID": studentID, "newStudentName": newStudentName };
                students.updateStudent(studentID, newStudentName)
                    .success(function(data) {
                        $scope.loading = false;
                        $scope.newStudentName = "";
                        $scope.students = data;
                    });
            }
        };
    }]);
