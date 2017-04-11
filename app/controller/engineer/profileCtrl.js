/**
 * Profile controller
 *@define controller
 *@param {string} profileCtrl - parameter refers to the controller used by HTML element
 *@param {function} selfInvoked- dependencies are added in it
 */
angular.module('mainApp').controller('profileCtrl', function ($scope,$rootScope,$stateParams,restService,$state){
  var query = {
      engineerId:$stateParams.engineerId
  };
  // restService call for Engineer Attendence data..
var promise = restService.httpRequest('readEmployeeProfileData', query,"get");
promise.then(function(data) {
    var dashData = data.data;
    $rootScope.empdetails = dashData.employeeData;
    $scope.profileData = dashData.profileData;
    $scope.profileData.engineerId = $stateParams.engineerId;
});
//update the Profile details of the employee
$scope.saveTable = function() {
    //UPDATING DATA
    restService.httpRequest('updateEmployeeProfileData', $scope.profileData,"put")
        .then(function(response) {
            //console.log("success");
            $state.reload();
        });
};
});
