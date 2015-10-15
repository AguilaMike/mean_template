"use strict";
(function () {
    angular
        .module('login', ['ui.router', 'form-messages'])
        .config(config)
        .directive('login', directive)

    function config($stateProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                template: '<login></login>'
            });
    }

    function directive() {
        return {
            templateUrl: 'app/components/user/login/login.html',
            controller: controller,
            controllerAs: "vm",
            bindToController: true
        }
    }

    function controller(usersDataService, $state) {
        var vm = this;

        vm.has_error = function (form, field) {
            return (form.$submitted || field.$touched) && field.$invalid;
        }

        vm.submit = function (form) {
            vm.form.$submitted = true;
            if (vm.form.$valid) {
                var session = usersDataService.newSession(vm.email, vm.password);
                usersDataService.postingSession(session)
                    .then(function (result) {
                        $state.go('profile');
                    }, function (err) {
                        vm.form.token.$error.invalidtoken = true;
                    })
            }
        }
    }
})();