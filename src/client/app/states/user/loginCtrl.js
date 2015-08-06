"use strict";
(function () {
    function loginCtrl() {
        var vm = this;

        vm.submit = function (form) {
            form.$submitted = true;
            if (form.$valid) {
                console.log("do something");
            }
        }
    }
    angular
        .module('template')
        .controller("loginCtrl", loginCtrl);
})();