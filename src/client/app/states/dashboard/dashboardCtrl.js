"use strict";
(function () {
    function dashboardCtrl() {
        var vm = this;
        vm.title = "the controller";
      }
        angular
        .module('template')
        .controller("dashboardCtrl", dashboardCtrl);
})();
