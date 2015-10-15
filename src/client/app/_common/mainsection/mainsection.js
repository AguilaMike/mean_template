"use strict";
(function () {
    var componentName = "mainsection";
    angular
        .module(componentName, ['ngAnimate'])
        .directive(componentName, directive)

    function directive() {
        return {
            templateUrl: 'app/_common/' + componentName + '/' + componentName + '.html'
        }
    }
})();