/*
 * FileName:calappdirective.js
 * CreatedBy: Prashant Praveen

 */
angular.module("mainApp").directive("appcalendar", function () {
    return {
        restrict: "E",
        templateUrl: "templates/attendanceSummaryCalendar.html",
        link: function (scope) {
            /*watch service is used to watch the changes in old and the new Data*/

            scope.$watch("attendance", function (oldData, newData) {
                if (scope.called === 0) {
                    var next = scope.month.clone();
                    _removeTime(next.month(next.month() + 1).date(1));
                    scope.month.month(scope.month.month() + 1);
                    _buildMonth(scope, next, scope.month);

                } else if (scope.called === 1) {
                    var previous = scope.month.clone();
                    _removeTime(previous.month(previous.month() - 1).date(1));
                    scope.month.month(scope.month.month() - 1);
                    console.log(scope.month);
                    _buildMonth(scope, previous, scope.month);
                } else if (scope.called === undefined) {
                    // scope.selected = _removeTime(scope.selected || moment());
                    scope.month = scope.selected;
                    var start = scope.selected.clone();
                    start.date(1);
                    _removeTime(start.day(0));
                    _buildMonth(scope, start, scope.month);
                }
            });
            //create  next and previous month calender object with timestamp generate
            scope.next = function () {
                scope.called = 0;
                var next = scope.month.clone();
                next.month(next.month() + 1);
                _removeTime(next.month(next.month() + 1).date(1));
                var timeStamp1 = next.unix();
                scope.readUnmark(timeStamp1 * 1000);
            };

            scope.previous = function () {
                scope.called = 1;
                var previous = scope.month.clone();
                var timeStamp2 = (previous.month(previous.month() - 1).unix() * 1000);
                scope.readUnmark(timeStamp2);
            };
        },
        controller: function ($http, $scope, $stateParams, $state, restService, $filter, $rootScope) {

            // $scope.day = moment();
            $scope.selected = moment();
            console.log($scope.selected);
            var token = localStorage.getItem('satellizer_token');
            var date = new Date();
            var timeStamp = Date.now(); //date.getTime();
            $scope.clickDay = function (date) //clicked date appear
            {
                // $rootScope.clickDate = date._d;
                var timeStamp = date.unix() * 1000; //timesatamp coverted in milliseconds
                $state.go("attendance.umarked", {timeStamp:timeStamp});
            };
            var query = {
                timeStamp:timeStamp
            };

            restService.httpRequest('readMonthlyAttendanceSummary', query,"get").then(function(data)
            {
                console.log(data);
                $scope.attendance = {};
                data.data.attendance.forEach(function (value, key) {
                    $scope.attendance[value.day] = {
                        "unmarked": value.unmarked,
                        "totalEmployee": data.data.totalEmployee
                    };
                });
            }).catch(function (error) {
                console.log(error);
            })
            //read umarked employee data for next and previous month buid
            $scope.readUnmark = function (timeStamp) {
                var query = {
                    timeStamp:timeStamp
                };

                restService.httpRequest('readMonthlyAttendanceSummary', query,"get").then(function(data) {
                  $scope.attendance = {};
                    data.data.attendance.forEach(function(value, key) {
                    $scope.attendance[value.day] = {

                            "unmarked": value.unmarked,
                            "totalEmployee": data.data.totalEmployee
                        };
                    });
                }).catch(function (error) {
                    console.log(error);
                })
            };
        }
    };

    function _removeTime(date) {
        return date.day(0).hour(0).minute(0).second(0).millisecond(0);
    }

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


    function _buildWeek(date, month, scope) {
        var days = [];

        if (scope.attendance !== undefined) {
            for (var i = 0; i < 7; i++) {
                if (date.month() === month.month() && (scope.attendance[date.date()] !== undefined)) {
                    if (scope.attendance[date.date()] !== undefined)
                        days.push({
                            name: date.format("dd").substring(0, 1),
                            number: date.date(),
                            isCurrentMonth: date.month() === month.month(),
                            isToday: date.isSame(new Date(), "day"),
                            timeStamp: date.unix(),
                            date: date,
                            unmarked: scope.attendance[date.date()].unmarked,
                            totalEmployee: scope.attendance[date.date()].totalEmployee
                        });
                } else if (date.month() === month.month())
                    days.push({
                        name: date.format("dd").substring(0, 1),
                        number: date.date(),
                        isCurrentMonth: date.month() === month.month(),
                        timeStamp: date.unix(),
                        isToday: date.isSame(new Date(), "day"),
                        date: date,
                        unmarked: scope.attendance[date.date()].unmarked,
                        totalEmployee: scope.attendance[date.date()].totalEmployee
                    });
                else
                    days.push({});
                date = date.clone();
                date.add(1, "d");
            }
        }
        return days;
    }
});
