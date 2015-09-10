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

    function controller(usersDataService) {
        var vm = this;

        init();

        function init() {
            usersDataService.gettingUser()
                .then(function (user) {
                    vm.user = user;
                })
        }

        vm.fields = [
            {
                key: 'email',
                type: 'input',
                templateOptions: {
                    label: 'Email',
                    placeholder: 'Email',
                    required: true,
                    type: 'text'
                }
            },
            {
                key: 'name',
                type: 'input',
                templateOptions: {
                    label: 'Name',
                    placeholder: 'Name',
                    required: true,
                    type: 'text'
                }
            },
            {
                key: 'location',
                type: 'custom',
                templateOptions: {
                    label: 'Location',
                    placeholder: 'Location',
                    type: 'text'
                }
            },
            {
                key: 'phone',
                type: 'input',
                templateOptions: {
                    label: 'Phone',
                    placeholder: 'Phone',
                    required: true,
                    minlength: 9,
                    type: 'tel'
                }
            },
            {
                key: 'url',
                type: 'input',
                templateOptions: {
                    label: 'URL',
                    placeholder: 'http://',
                },
                validators: {
                    urlAddress: function (viewValue, modelValue) {
                        var value = modelValue || viewValue;
                        return /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi.test(value);
                    }
                }
            }

        ];

        vm.submit = function () {
            vm.user = usersDataService.updatingUser(vm.user.id, vm.user);
        }
    }
})();