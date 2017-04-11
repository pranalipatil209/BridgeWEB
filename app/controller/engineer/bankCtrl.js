/**
 * Bank controller
 *@define controller
 *@param {string} bankCtrl - parameter refers to the controller used by HTML element
 *@param {function} selfInvoked- dependencies are added in it
 */
angular.module('mainApp').controller('bankCtrl', function ($scope,$stateParams,restService,$rootScope,$state){
  var query = {
      engineerId: $stateParams.engineerId
    };
    //get the Bank details of the employee
      restService.httpRequest('readEmployeeBankData', query ,"get")
        .then(function (data) {
          $rootScope.empdetails = data.data.employeeData;
          $scope.bankData = data.data.bankData;
          $scope.bankData.engineerId = $stateParams.engineerId;

        }).catch(function (error) {
          console.log(error);
        });
    //update the Bank details of the employee
    $scope.saveTable = function () {
      restService.httpRequest('updateEmployeeBankData', $scope.bankData ,'put');
    };

});
