/**
 * HR Data controller
 *@define controller
 *@param {string} hrDataCtrl - parameter refers to the controller used by HTML element
 *@param {function} selfInvoked- dependencies are added in it
 */
angular.module('mainApp').controller('hrDataCtrl', function ($scope,$stateParams,restService,$rootScope,$state){

  var query = {
    engineerId: $stateParams.engineerId
  };
  //get the HR details of the employee

    restService.httpRequest('readEmployeeHRData', query,"get")
      .then(function (data) {
        $rootScope.empdetails = data.data.employeeData;
        $scope.hrData = data.data.hrData;
        $scope.hrData.engineerId = $stateParams.engineerId;
      }).catch(function (error) {

        console.log(error);
      });
  //update the HR details of the employee
  $scope.saveTable = function() {
      //UPDATING DATA
      restService.httpRequest('updateEmployeeHRData', $scope.hrData,"put")
          .then(function(response) {
              //console.log("success");
              $state.reload();
          });
  };
});
