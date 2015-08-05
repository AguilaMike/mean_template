"use strict";
(function () {
    function dashboardCtrl() {
        var vm = this;
        vm.title = "the dashboard controller";
      }
        angular
        .module('template')
        .controller("dashboardCtrl", dashboardCtrl);
})();
