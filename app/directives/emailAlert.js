/*
 * FileName:calappdirective.js
 * CreatedBy: Prashant Praveen

 */
angular.module("mainApp").directive("emailAlert", function () {
    return {
        restrict: "E",
        scope : {
            type : '@'
        },
        templateUrl: 'templates/emailAlertPopup.html',
        controller: function ($scope, restService,ngDialog,$timeout) {
            console.log('inside directive data ');
            console.log('hello');
            var query = { timeStamp : new Date().getTime() };
            console.log(query);
            $scope.sendfor = '';
            $scope.sendEmail = function (val) {
                console.log('ok', val);
                restService.httpRequest(val , query, 'post').then(function (data) {
                    console.log(data);
                    var msg = data.data.message;
                    ngDialog.open({
                        template: "<p style='color: darkgreen;'>"+msg+"</p>",
                        className: 'ngdialog-theme-default',
                        plain: true,
                        overlay: false,
                        width: '45%',
                        showClose: false
                    });

                }, function (err) {
                    ngDialog.open({
                        template: "<p style='color: darkred;'>Unable to send emails!</p>",
                        className: 'ngdialog-theme-default',
                        plain: true,
                        overlay: false,
                        width: '45%',
                        showClose: false
                    });
                });
                $timeout(function(){
                    ngDialog.close();
                },1500);
            }
        }
    }

});
