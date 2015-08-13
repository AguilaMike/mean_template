"use strict";
(function () {
    angular
        .module('competition', ['ui.router'])
        .config(config)
        .directive('competition', directive)
        .factory('competitionDataService', competitionDataService)

    function config($stateProvider) {
        $stateProvider
            .state('competition', {
                url: '/competition/:name',
                template: '<competition></competition>'
            });
    }

    function directive() {
        return {
            templateUrl: 'app/components/competition/competition.html',
            controller: controller,
            controllerAs: "vm",
            bindToController: true
        }
    }

    function controller() {
        var vm = this;

        //        init();
        //
        //        function init() {
        //            vm.competitions = competitionsDataService.getCompetitions();
        //        }
        //
        //        vm.addCompetition = function (competition) {
        //            competitionsDataService.addCompetition(competition);
        //        }
        //
        //        vm.deleteCompetition = function (id) {
        //            competitionsDataService.deleteCompetition(id);
        //        }
        //
        //        vm.updateCompetition = function (competition) {
        //            competitionsDataService.updateCompetition(competition);
        //        }
    }

    function competitionDataService($resource) {
        var factory = {};

        //        var competitions = $resource('/api/pub/competitions');
        //        var competition = $resource('/api/pub/competition/:id/', {}, {
        //            update: {
        //                method: 'PUT'
        //            }
        //        });
        //
        //        factory.getCompetitions = function () {
        //            return competitions.query();
        //        };
        //
        //        factory.getCompetition = function (id) {
        //            return competition.get({
        //                id: id
        //            }).$promise;
        //        }
        //
        //        factory.addCompetition = function (competition) {
        //            return competitions.save(competition);
        //        };
        //
        //        factory.deleteCompetition = function (id) {
        //            return competition.delete({
        //                id: id
        //            });
        //        };
        //
        //        factory.updateCompetition = function (comp) {
        //            return competition.update({
        //                id: comp._id
        //            }, comp);
        //        };

        return factory;
    }


})();