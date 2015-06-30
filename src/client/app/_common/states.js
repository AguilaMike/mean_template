(function () {
    function statesConfig($stateProvider, $urlRouterProvider, $locationProvider, settings) {

        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
        var urlBase = settings.urlBase + '/app/states/';

        $stateProvider
            .state('dashboard', {
                url: '/',
                templateUrl: urlBase + 'dashboard/dashboard.html',
                controller: 'dashboardCtrl as vm'
            })
            .state('login', {
                url: '/user/login',
                templateUrl: urlBase + 'user/login.html',
                controller: 'loginCtrl as vm'
            })
    }
    angular
        .module("template")
        .config(statesConfig);
})();
