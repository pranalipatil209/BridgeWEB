angular.module('mainApp').directive('cardInfo', function() {
    /* return data */
    return {
        restrict: 'EA',
        scope: {
            data: '='
        },
        /* directive redirect to the html file*/
        templateUrl: 'partials/cardInfo.html',
        controller : function ($scope,$state) {
            $scope.showProfile = function(){
                $state.go('details');
            }
        }
    }

});