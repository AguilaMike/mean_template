"use strict";
(function () {
    angular
        .module('profile', ['ui.router', 'formly', 'formlyBootstrap'])
        .config(config)
        .directive('profile', directive)

    function config($stateProvider, formlyConfigProvider) {
        $stateProvider
            .state('profile', {
                url: '/profile',
                template: '<profile></profile>'
            });

        formlyConfigProvider.setType({
            name: 'custom',
            templateUrl: 'custom.html'
        })
    }

    function directive() {
        return {
            templateUrl: 'app/components/user/profile/profile.html',
            controller: controller,
            controllerAs: "vm",
            bindToController: true
        }
    }

    function controller() {
        var vm = this;

        vm.model = {};
        vm.fields = [
            {
                key: 'text',
                type: 'custom',
                templateOptions: {
                    label: 'Name',
                    placeholder: 'Name'
                }
            }
        ];

        vm.submit = function () {
            //do something
        }
    }
})();