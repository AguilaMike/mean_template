"use strict";
(function () {
    angular
        .module('team', ['ui.router', 'rider'])
        .config(config)
        .directive('team', directive)
        .factory('teamDataService', teamDataService)

    function config($stateProvider) {
        $stateProvider
            .state('team', {
                url: '/equipos',
                template: '<team></team>'
            });
    }

    function directive() {
        return {
            templateUrl: 'app/components/team/team.html',
            controller: controller,
            controllerAs: "vm",
            bindToController: true
        }
    }

    function controller(teamDataService, $rootScope) {
        var vm = this;

    }

    function teamDataService($resource) {
        var factory = {};



        return factory;
    }
})();