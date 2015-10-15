"use strict";
(function () {
    angular
        .module('navbar', ['ui.router', 'ngStorage'])
        .directive('navbar', directive)

    function directive() {
        return {
            templateUrl: 'app/_common/navbar/navbar.html',
            controller: controller,
            controllerAs: 'navCtrl',
            bindToController: true
        }
    }

    function controller($state, $localStorage) {
        var vm = this;

        vm.isLogged = false;
        vm.isActive = function (state) {
            return $state.is(state);
        }
        vm.logout = function () {
            delete $localStorage['xAccessToken'];
            vm.isLogged = false;
            console.log(vm);
            $state.go('dashboard');
        }

        init();

        function init() {
            if ($localStorage['xAccessToken'] != null) {
                vm.isLogged = true;
            }
            console.log(vm);
        }
    }
})();