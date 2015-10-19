"use strict";
(function () {
    /** component state to show a dasboard  */
    var componentName = "movimientos";
    angular
        .module(componentName, ['ui.router','formly','formlyBootstrap','ngResource'])
        .config(stateConfig)
        .directive(componentName, directive)
        .service(componentName + "DataService", service)

    /** declares a state for this component, it will handle the router logic also */
    function stateConfig($stateProvider) {
        $stateProvider
            .state(componentName, {
                url: '/'+componentName,
                template: '<movimientos></movimientos>' // the directive that wraps the view and logic
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

    function controller(movimientosDataService) {
        var vm = this;
        vm.title = "Mis movimientos";
        
         vm.movimiento = movimientosDataService.newMovimiento();
         vm.movimiento.tipo="Ingreso";    
        
         vm.fields = [
            {
                key: 'tipo',
                type: 'input',
                templateOptions: {
                    label: 'Tipo',
                    placeholder: 'Ingreso o gasto',
                    required: true,
                    type: 'text'
                }
            },
            {
                key: 'categoria',
                type: 'input',
                templateOptions: {
                    label: 'Categoría',
                    placeholder: 'Elige categoría',
                    required: true,
                    type: 'text'
                }
            },{
                key: 'fecha',
                type: 'input',
                templateOptions: {
                    label: 'Fecha',
                    required: false,
                    type: 'date'
                }
            },{
                key: 'importe',
                type: 'input',
                templateOptions: {
                    label: 'Importe',
                    placeholder: 'en euros',
                    required: true,
                    type: 'number'
                }
            },
         ]
         
         vm.submit = function () {
            movimientosDataService
                .insertingMovimiento(vm.movimiento)
                .then(function(){
                    vm.movimiento = movimientosDataService.newMovimiento();
                    vm.movimiento.tipo="Ingreso";  
            });
        }
        
    }
    
    function service($resource){
        var Movimiento = $resource(
            '/api/movimientos/:id',
            {
                id: '@_id'
            },
            {
                'update':
                {
                    method: 'PUT'
                }
            });
        
        this.newMovimiento= function(){
            return new Movimiento();
        }
        
        this.insertingMovimiento= function(movimiento){
            return movimiento.$save();
        }
    }
})();









