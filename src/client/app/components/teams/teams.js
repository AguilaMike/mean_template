"use strict";
(function () {
    angular
        .module('teams', ['ui.router'])
        .config(config)
        .directive('teams', directive)
        .factory('teamsDataService', teamsDataService)

    function config($stateProvider) {
        $stateProvider
            .state('teams', {
                url: '/equipos',
                template: '<teams></teams>'
            });
    }

    function directive() {
        return {
            templateUrl: 'app/components/teams/teams.html',
            controller: controller,
            controllerAs: "vm",
            bindToController: true
        }
    }

    function controller(teamsDataService, $rootScope) {
        var vm = this;

        //        teamsDataService.gettingTeams()
        //            .then(function (teams) {
        //                vm.teams = teams;
        //                var description = "";
        //                teams.forEach(function (team) {
        //                    description += ", " + team._id;
        //                });
        //                $rootScope.head = {};
        //                $rootScope.head.title = "Ciclismania | Equipos ciclistas";
        //                $rootScope.head.description = "equipos ciclistas" + description;
        //            });
    }

    function teamsDataService($resource) {
        var factory = {};

        //        var teams = $resource('/api/pub/teams');
        //        var teamsSafeName = $resource('/api/teams/safe_name/:safe_name/');
        //        var team = $resource('/api/pub/teams/:team/');
        //
        //        var roles = ['Sprinter', 'Todoterreno', 'Escalador', 'Cazaetapas', 'Gregario', 'Líder de equipo', 'Contrarrelojista'];
        //
        //        factory.gettingTeams = function () {
        //            return teams.query().$promise;
        //        };
        //        factory.getRoles = function () {
        //            return roles;
        //        };
        //        factory.getTeamsBySafeName = function (safe_name) {
        //            return teamsSafeName.get({safe_name : safe_name}).$promise;
        //        };
        //        factory.getTeamByName = function (teamName) {
        //            return team.get({team : teamName}).$promise;
        //        };

        return factory;
    }
})();