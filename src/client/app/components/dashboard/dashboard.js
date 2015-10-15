"use strict";
(function () {
    /** component state to show a dasboard  */
    var componentName = "dashboard";
    angular
        .module(componentName, ['ui.router'])
        .config(stateConfig)
        .directive(componentName, directive)

    /** declares a state for this component */
    function stateConfig($stateProvider) {
        $stateProvider
            .state(componentName, {
                url: '/',
                template: '<dashboard></dashboard>' // the directive that wraps the view and logic
            });
        // there are no controllers linked to views anymore
        // the directive will hold the logic in private controllers if needed
    }

    
    function directive() {
        return {
            templateUrl: 'app/components/' + componentName + '/' + componentName + '.html',
            controller: controller,
            controllerAs: componentName,
            bindToController: true,
            scope:{}
        }
    }

    function controller() {
        var vm = this;
        vm.title = "My great dashboard";
    }
})();