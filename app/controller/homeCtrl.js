angular.module('mainApp').controller('homeCtrl', function ($scope, $location, $stateParams, $state, $auth, localStorageService) {
    $scope.isAuth = function () {
        return $auth.isAuthenticated();
    };
    $scope.logout = function () {
        if (!$auth.isAuthenticated()) {
            return;
        }
        $auth.logout()
            .then(function () {
                $state.go('login');
            }).catch(function (error) {
        });
    };
    $scope.today = new Date();
    $scope.userEmail = localStorageService.get('user');
    var name = $scope.userEmail.split('@');

    console.log(name);
    $scope.name = name[0];

    $scope.isActive = function (destination) {
      // console.log($location.path());
        return destination === $location.path();
    };
});
