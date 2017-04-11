angular.module('mainApp').directive("attendanceCalendar", function ($rootScope, $http, $mdDialog) {
    return {
        restrict: "E",
        templateUrl: "templates/engineer/attendance.html",
        scope: {
            selected: "=",
            data: "="
        },
        link: function (scope,element,controller) {
            //console.log(scope,element,controller);
            scope.readData(Date.now());
            scope.inc = 0;
            scope.$watch("attendance", function (data, newData) {
                if (scope.called === undefined) {
                    scope.selected = _removeTime(scope.selected || moment());
                    scope.month = scope.selected.clone();
                    var start = scope.selected.clone();
                    start.date(1);
                    _removeTime(start.day(0));a
                    _buildMonth(scope, start, scope.month);

                } else if (scope.called === 0) {
                    var next = scope.month.clone();
                    _removeTime(next.month(next.month() + 1).date(1));
                    scope.month.month(scope.month.month() + 1);
                    _buildMonth(scope, next, scope.month);
                } else if (scope.called === 1) {
                    var previous = scope.month.clone();
                    _removeTime(previous.month(previous.month() - 1).date(1));
                    scope.month.month(scope.month.month() - 1);
                    _buildMonth(scope, previous, scope.month);
                }
            });

            //show dialog according to attendance status
            scope.showAlert = function (ev, day) {

                 if (day.status.attendanceStatus === "Present"||day.status.attendanceStatus === "Leave" || day.status.attendanceStatus === "CompLeave") {

                    $mdDialog.show({
                            controller: function(scope){
                                console.log("Called ",day);
                                scope.reason = day.status.reason;
                                scope.punchIn = day.status.punchIn;
                                scope.punchOut = day.status.punchOut;
                                scope.present = (day.status.attendanceStatus === "Present");
                                scope.cancel = function(){
                                   $mdDialog.cancel();
                                };
                            },
                            templateUrl: 'templates/engineer/PopUp.html',
                            parent: angular.element(document.querySelector('#popupContainer')),
                            targetEvent: ev,
                            clickOutsideToClose: true,
                            disableParentScroll: false

                        })
                        .then(function (answer) {
                            // $scope.status = 'You said the information was "' + answer + '".';
                        }, function () {
                            // $scope.status = 'You cancelled the dialog.';
                        });
                }
            };
            scope.select = function (day) {
            };
            //Function to show next month
            scope.next = function () {
                scope.called = 0;
                var next = scope.month.clone();
                scope.readData(next.month(next.month() + 1).date(1).unix() * 1000);
            };

            //Function to show previous month
            scope.previous = function () {
                scope.called = 1;
                var previous = scope.month.clone();
                scope.readData(previous.month(previous.month() - 1).date(1).unix() * 1000);
            };
        },
        controller: "attendanceCtrl"

    };



    function _removeTime(date) {
        return date.day(0).hour(0).minute(0).second(0).millisecond(0);
    }

    //Build month with array of weeks
    function _buildMonth(scope, start, month) {
        scope.weeks = [];
        var done = false,
            date = start.clone(),
            monthIndex = date.month(),
            count = 0;
        while (!done) {
            scope.weeks.push({
                days: _buildWeek(date.clone(), month, scope)
            });
            date.add(1, "w");
            done = count++ > 2 && monthIndex !== date.month();
            monthIndex = date.month();

        }


    }

    //Build week with array of days
    function _buildWeek(date, month, scope) {

        var days = [];
        for (var i = 0; i < 7; i++) {


            if (date.month() === month.month() && (scope.attendance[date.date()] !== undefined)) {
                if (scope.attendance[date.date()] !== undefined)
                    days.push({
                        name: date.format("dd").substring(0, 1),
                        number: date.date(),
                        isCurrentMonth: date.month() === month.month(),
                        isToday: date.isSame(new Date(), "day"),
                        date: date,
                        enable: true,
                        status: scope.attendance[date.date()]
                    });
            } else if (date.month() === month.month())
                days.push({
                    name: date.format("dd").substring(0, 1),
                    number: date.date(),
                    isCurrentMonth: date.month() === month.month(),
                    isToday: date.isSame(new Date(), "day"),
                    date: date,
                    enable: true,
                    status: ''

                });
            else
                days.push({});

            date = date.clone();
            date.add(1, "d");
        }
        return days;
    }

});
