"use strict";
(function () {
    angular
        .module('register', ['ui.router', 'formMessages', 'ngResource', 'ngStorage'])
        .config(config)
        .directive('register', directive)


    function config($stateProvider) {
        $stateProvider
            .state('register', {
                url: '/register',
                template: '<register></register>'
            });
    }

    function directive() {
        return {
            templateUrl: 'app/components/user/register/register.html',
            controller: controller,
            controllerAs: "vm",
            bindToController: true
        }
    }

    function controller(usersDataService, $localStorage, $state) {
        var vm = this;

        vm.has_error = function (form, field) {
            return (form.$submitted || field.$touched) && field.$invalid;
        }

        vm.submit = function () {
            vm.form.$submitted = true;
            if (vm.form.$valid) {
                var user = usersDataService.newUser(vm.email, vm.password);
                usersDataService.postingUser(user)
                    .then(function (token) {
                        console.log(token);
                        $localStorage['xAccessToken'] = token;
                        $state.go('profile');
                    }, function (err) {
                        vm.form.token.$error.invalidtoken = true;
                    })
            }
        }
    }


})();