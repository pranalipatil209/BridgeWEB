/*
 * FileName:unmarkedEmp.js
 bind the controller with the module and inject the services
 */
angular.module('mainApp').controller('falloutLeaveCtrl', function ($scope, $state,restService) {
    var query = { timeStamp : new Date().getTime() };
    console.log(query);
    var locale = "en-us";

    $scope.fallout = function () {
        restService.httpRequest('readFalloutAttendanceEmployee', query, 'get').then(function (data) {
            console.log('res ',data);
            $scope.passData = data;
            var date = new Date(parseInt(data.data.timeStamp));
            $scope.date = (date.toLocaleString(locale, { month: "long" })) +', '+ date.getFullYear();
            $scope.totalEmployee = data.data.totalEmployee;
            $scope.falloutNumber = data.data.falloutNumber;
            $scope.falloutData = data.data.falloutEmployee;
        });
    };

    $scope.leave = function () {
        restService.httpRequest('readLeaveEmployee', query, 'get').then(function (data) {
            console.log('res ',data);
            $scope.passData = data;
            var date = new Date(parseInt(data.data.timeStamp));
            $scope.date = (date.toLocaleString(locale, { month: "long" })) +', '+ date.getFullYear();
            $scope.totalEmployee = data.data.totalEmployee;
            $scope.leaveNumber = data.data.employeeLeave;
            $scope.leaveData = data.data.leaveOutEmployee;
        });
    };

    $scope.previous = function(){
        $state.go('dashboard');
    };
});
