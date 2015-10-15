"use strict";
(function () {
    var componentName = "footerbar";
    angular
        .module(componentName, [])
        .directive(componentName, directive)

    function directive() {
        return {
            templateUrl: 'app/_common/' + componentName + '/' + componentName + '.html'
        }
    }

})();