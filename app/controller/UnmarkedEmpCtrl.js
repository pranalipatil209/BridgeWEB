/*
 * FileName:unmarkedEmp.js
 bind the controller with the module and inject the services
 */
angular.module('mainApp').controller('unmarkedEmp', function ($scope, $stateParams, $state, $http, localStorageService, restService) {
    var query = { timeStamp : $stateParams.timeStamp };
    console.log(query);
    restService.httpRequest('readUnmarkedAttendanceEmployee', query, "get").then(function (data) {
        console.log('res ',data);
        $scope.passData = data;
        var date = new Date(parseInt(data.data.timeStamp));
        var locale = "en-us";
        $scope.date = date.getDate() +' '+ (date.toLocaleString(locale, { month: "long" })) +', '+ date.getFullYear();
        $scope.totalEmployee = data.data.totalEmployee;
        $scope.unmarkedNumber = data.data.unmarkedNumber;
        $scope.unmarkedData = data.data.umarkedEmployee;
    });

    $scope.previous = function(){
        $state.go('attendance.month');
    };
});
