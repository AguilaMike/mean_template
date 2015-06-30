"use strict";
(function () {
    function loginCtrl() {
        var vm = this;
        vm.title = "the controller";
      }
        angular
        .module('template')
        .controller("loginCtrl", loginCtrl);
})();
