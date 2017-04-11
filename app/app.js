var mainApp = angular.module("mainApp", ['ui.router', 'ngMaterial', 'LocalStorageModule', 'satellizer', 'ngDialog', 'xeditable']);

mainApp.config(function ($stateProvider, $urlRouterProvider, $httpProvider, $authProvider) {

    var skipIfLoggedIn = ['$q', '$auth', function ($q, $auth) {
        var deferred = $q.defer();
        if ($auth.isAuthenticated()) {
            deferred.reject();
        } else {
            deferred.resolve();
        }
        return deferred.promise;
    }];

    var loginRequired = ['$q', '$location', '$auth', function ($q, $location, $auth) {
        var deferred = $q.defer();
        if ($auth.isAuthenticated()) {
            deferred.resolve();
        } else {
            $location.path('/login');
        }
        return deferred.promise;
    }];

    $urlRouterProvider.otherwise('/dashboard');

    /** @define states */
    $stateProvider
    /** Login state */
        .state('login', {
            url: '/login',
            views: {
                home: {
                    templateUrl: 'templates/login.html',
                    controller: 'loginCtrl'
                }
            },
            resolve: {
                skipIfLoggedIn: skipIfLoggedIn //skips login
            }
        })
        /** homes nested states */
        /**dasBoard~state */
        .state('dashboard', {
            url: '/dashboard',
            views: {
                nav: {
                    templateUrl: 'templates/home.html'
                },
                home: {
                    templateUrl: 'templates/dashboard.html',
                    controller: 'dashboardCtrl'
                }
            },
            resolve: {
                loginRequired: loginRequired
            }
        })
        .state('engineer', {
            url: '/engineer',
            views: {
                nav: {
                    templateUrl: 'templates/home.html'
                },
                home: {
                    template: '<ui-view></ui-view>',
                }
            },
            resolve: {
                loginRequired: loginRequired
            }
          })
        .state('engineer.search', {
                    url: '/search',
                    templateUrl: 'templates/engineers.html',
                    controller: 'engineerMainCtrl',
                    resolve: {
                        loginRequired: loginRequired
                    }
                })
        .state('engineer.engineerData', {
                    url: '/:engineerId',
                    templateUrl: 'templates/engineer/engineer.html',
                    // controller: 'engineerMainCtrl',
                    resolve: {
                        loginRequired: loginRequired
                    }
                })

        .state('engineer.engineerData.attendance', {
            url: '/attendance',
            templateUrl: 'templates/engineer/calendar.html',
            resolve: {
                loginRequired: loginRequired
            }
        })
        .state('engineer.engineerData.personal', {
            url: '/personal',
            templateUrl: 'templates/engineer/personal.html',
            controller: 'personalCtrl',
            resolve: {
                loginRequired: loginRequired
            }
        })
        .state('engineer.engineerData.profile', {
            url: '/profile',
            templateUrl: 'templates/engineer/profile.html',
            controller: 'profileCtrl',
            resolve: {
                loginRequired: loginRequired
            }
        })
        .state('engineer.engineerData.hrData', {
            url: '/HRData',
            templateUrl: 'templates/engineer/hrData.html',
            controller: 'hrDataCtrl',
            resolve: {
                loginRequired: loginRequired
            }
        })
        .state('engineer.engineerData.bank', {
            url: '/bank',
            templateUrl: 'templates/engineer/bank.html',
            controller: 'bankCtrl',
            resolve: {
                loginRequired: loginRequired
            }
        })
        .state('engineer.engineerData.tracking', {
            url: '/tracking',
            templateUrl: 'templates/engineer/tracking.html',
            controller: 'trackingCtrl',
            resolve: {
                loginRequired: loginRequired
            }
        })
        /**engg~state */
        .state('attendance', {
            url: '/attendance',
            views: {
                nav: {
                    templateUrl: 'templates/home.html'
                },
                home: {
                    template: '<ui-view></ui-view>',
                    controller: 'attendanceSummaryCtrl'
                }
            },
            resolve: {
                loginRequired: loginRequired
            }
        })
        .state('attendance.month', {
            url: '/month',
            template: '<appcalendar></appcalendar>',
            resolve: {
                loginRequired: loginRequired
            }
        })
        .state('attendance.umarked', {
            url: '/month/unmarked/:timeStamp',
            templateUrl: 'templates/unmarkedEmp.html',
            controller : 'unmarkedEmp',
            resolve: {
                loginRequired: loginRequired
            }
        })
        .state('attendance.fallout', {
            url: '/fallout',
            templateUrl: 'templates/showFallout.html',
            controller : 'falloutLeaveCtrl',
            resolve: {
                loginRequired: loginRequired
            }
        })
        .state('attendance.leave', {
            url: '/leavesummary',
            templateUrl: 'templates/showLeaveSummary.html',
            controller : 'falloutLeaveCtrl',
            resolve: {
                loginRequired: loginRequired
            }
        });

}).run(function ($rootScope, $state) {
    $rootScope.$state = $state;
});
//end of config
