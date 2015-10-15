"use strict";
(function () {
    var componentName = "navbar";
    angular
        .module(componentName, ['ui.router', 'ngStorage'])
        .directive(componentName, directive)

    function directive() {
        return {
            templateUrl: 'app/_common/' + componentName + '/' + componentName + '.html',
            controller: controller,
            controllerAs: componentName,
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