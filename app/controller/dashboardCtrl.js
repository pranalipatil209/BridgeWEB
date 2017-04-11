/**
 * DashBoard controller
 *@define controller
 *@param {string} dashCtrl - parameter refers to the controller used by HTML element
 *@param {function} selfInvoked- dependencies are added in it
 */
angular.module('mainApp').controller('dashboardCtrl', function ($scope,restService,$location) {
    var dash_timeStamp = new Date().getTime();
    console.log(dash_timeStamp);
    $scope.dashBoardData=hrDashData.dashBoardData;
    // dashboard initialization
    $scope.dashPage=function(){
    var dashBoard = new Date();
    $scope.previous = dashBoard.setDate(dashBoard.getDate() - 1);
    var query = {
        timeStamp: dash_timeStamp
    };
    // restService call for Dashboard data..
    var promise = restService.httpRequest('readDashboardData', query,"get");

    promise.then(function (data) {
        var dashData = data.data;
        $scope.dashData = dashData;
        console.log(dashData);
    });
  };
    //splitting key by space
    $scope.split = function (key) {
        key = key.split(/(?=[A-Z])/).join(" ");
        return key.charAt(0).toUpperCase() + key.slice(1);
    };

    $scope.go = function () {
        $location.path('/attendance/fallout');
    }
});
