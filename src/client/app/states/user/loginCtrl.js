"use strict";
(function () {
    function loginCtrl() {
        var vm = this;
        vm.title = "the login controller";
      }
        angular
        .module('template')
        .controller("loginCtrl", loginCtrl);
})();
