/**
 * Tracking controller
 *@define controller
 *@param {string} trackingCtrl - parameter refers to the controller used by HTML element
 *@param {function} selfInvoked- dependencies are added in it
 */
angular.module('mainApp').controller('trackingCtrl', function ($scope,$rootScope,$stateParams,restService,$state){
  var query = {
      engineerId:$stateParams.engineerId
  };
  // restService call for Engineer Attendence data..
  var promise = restService.httpRequest('readEmployeeTrackingData', query,"get");
  promise.then(function(data) {
    var dashData = data.data;
    $rootScope.empdetails = dashData.employeeData;
    $scope.trackingData = dashData.trackingData;
    $scope.trackingData.engineerId = $stateParams.engineerId;
  });
  //update the Profile details of the employee
  $scope.saveTable = function() {
    //UPDATING DATA
    restService.httpRequest('updateEmployeeTrackingData', $scope.trackingData,"put")
        .then(function(response) {
            //console.log("success");
            $state.reload();
        });
  };

});
