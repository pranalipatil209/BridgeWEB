/**
 * Engineers controller
 *@define controller
 *@param {string} engCtrl - parameter refers to the controller used by HTML element
 *@param {function} selfInvoked- dependencies are added in it
 */
angular.module('mainApp').controller('engineerMainCtrl', function ($scope, utilService, $state,restService) {
    $scope.filters = hrDashData.filters;
    $scope.alphabet = hrDashData.alphabets;

    //Engineer page display..
    $scope.engPage = function () {
        $scope.dataLoading = true; // data loading icon...

        //restService call for fetching data
        restService.httpRequest('searchEmployeeByName',{},"get").then(function (data) {
            data = utilService.sortingByName(data);//sorting by name
            $scope.profile = utilService.createSection(data);//creating section
            $scope.dataLoading = false;

            /*
            *after clicking anchor tag..
            */
            $scope.scrollTo = function (id) {
                //removing active class from all the anchor tags
                $(".alphabets li a").removeClass("active");
                // add class to the one we clicked
                $(".alphabets li ." + id).addClass("active");
                //it will scroll to the particular section
                $('html,body').animate({ scrollTop: $("#" + id).offset().top - 120 }, 'slow');
            };

            /*
            *filltering Engineer data according to form
            */
            $scope.filterFormData = function () {
                console.log("filter through form");
                $scope.errorpage = false;
                var filteredData = utilService.filltering(data, $scope.filters);
                if (filteredData.length != 0) {
                    $scope.profile = utilService.createSection(filteredData);
                }
                else {
                    $scope.profile = utilService.createSection(filteredData);
                    $scope.errorpage = true;
                }
                $('.dropdown.open .dropdown-toggle').dropdown('toggle');
            }
        });
    }

});
