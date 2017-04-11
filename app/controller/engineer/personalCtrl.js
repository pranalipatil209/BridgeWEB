/**
 * Personal controller
 *@define controller
 *@param {string} personalCtrl - parameter refers to the controller used by HTML element
 *@param {function} selfInvoked- dependencies are added in it
 */
angular.module('mainApp').controller('personalCtrl',function($scope, $rootScope, $state, $auth, $stateParams, restService) {
    console.log("Engineers Personal is calling !!");

    //Authentication Check
    $scope.isAuthenticated = function() {
        return $auth.isAuthenticated();
    };

    //Getting Id
    var engineerId = $stateParams.engineerId;
    $scope.profileId=engineerId;

    // GET restService Call
    var getconfig = {
        engineerId: engineerId
    };

    restService.httpRequest('readEmployeePersonalData', getconfig ,"get")
        .then(function(data) {
            $scope.personalData = data.data.personalData;
            $scope.personalData.engineerId = engineerId;
            $rootScope.empdetails = data.data.employeeData;
        });


    //Editable Page
    $scope.saveTable = function() {
        //UPDATING DATA
        restService.httpRequest('updateEmployeePersonalData', $scope.personalData,"put")
            .then(function(response) {
                //console.log("success");
                $state.reload();
            });
    };
});
