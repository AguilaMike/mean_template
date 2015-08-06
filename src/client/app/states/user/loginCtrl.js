"use strict";
(function () {
    function loginCtrl() {
        var vm = this;
<<<<<<< HEAD

        vm.submit = function (form) {
            form.$submitted = true;
            if (form.$valid) {
                console.log("do something");
            }
        }
    }
    angular
=======
        vm.title = "the login controller";
      }
        angular
>>>>>>> bdfb209fc75244767d5ea889ed8a3fc20df9e2c8
        .module('template')
        .controller("loginCtrl", loginCtrl);
})();
