/**
 * Login controller
 *@define controller
 *@param {string} loginCtrl - parameter refers to the controller used by HTML element
 *@param {function} selfInvoked- dependencies are added in it
 */
angular.module('mainApp').controller('loginCtrl', function ($scope, $state, $auth, localStorageService,restService) {

    /**email and password validation regex pattern*/
    $scope.email = hrDashData.email;
    $scope.pwd = hrDashData.pwd;

    /**dataloading icon*/
    $scope.dataLoading = false;

    /**
     *@method login- function to login
     */
    $scope.login = function () {
        $scope.dataLoading = true;
        $("#pwd-label").css("color", "#3B5372");
        $("#password").css("borderColor", "#3B5372");
        localStorageService.set('user', $scope.user.emailId);
        var config={ method: 'POST', url: restService.baseUrl+'login' }; //Creating the Configuration Object for satelizer
        $auth.login($scope.user,config) //satelizer service method call
            .then(function (data) {
                if (data.status == 200) {
                    localStorageService.set("token", data.data);//response data is stored in localStorageService

                    $state.go('dashboard');
                }
                else {
                    $scope.dataLoading = false;
                    $("#pwd-label").css("color", "rgba(236, 13, 13, 1)");
                    $("#password").css("borderColor", "rgba(236, 13, 13, 1)");
                    $scope.error = "Invalid Password or Email Id";
                    toastr.error(error.data.message, error.status);
                    $state.go('login');
                }

            })
            .catch(function (error) {
                $scope.dataLoading = false;
                $("#pwd-label").css("color", "rgba(236, 13, 13, 1)");
                $("#password").css("borderColor", "rgba(236, 13, 13, 1)");
                $scope.error = "Invalid Password or Email Id";
                // toastr.error(error.data.message, error.status);
            });
    };

});//end of controller
