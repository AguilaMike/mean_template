(function () {
    "use strict";

    function directive() {
        return {
            templateUrl: "app/_common/form-messages/form-messages.html",
            scope: {
                field: "="
            }
        };
    };
    angular
        .module("template")
        .directive("formMessages", directive)

}());