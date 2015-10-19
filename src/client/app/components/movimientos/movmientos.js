"use strict";
(function () {
    var componentName = "movimientos";
    angular
        .module(componentName, ['ui.router', 'formly', 'formlyBootstrap', 'ngResource'])
        .config(stateConfig)
        .directive(componentName, directive)
        .service(componentName + "DataService", service)

    function stateConfig($stateProvider) {
        $stateProvider
            .state(componentName, {
                url: '/' + componentName,
                template: '<movimientos></movimientos>'
            });
    }


    function directive() {
        return {
            templateUrl: 'app/components/' + componentName + '/' + componentName + '.html',
            controller: controller,
            controllerAs: componentName,
            bindToController: true,
            scope: {}
        }
    }

    function controller(movimientosDataService) {
        var vm = this;
        vm.title = "Mis movimientos";

        vm.movimiento = movimientosDataService.newMovimiento();
        vm.movimiento.tipo = "Ingreso";

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
            }, {
                key: 'fecha',
                type: 'input',
                templateOptions: {
                    label: 'Fecha',
                    required: false,
                    type: 'date'
                }
            }, {
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

        vm.guardarMovimiento = function () {
            movimientosDataService
                .insertingMovimiento(vm.movimiento)
                .then(function () {
                    vm.movimiento = movimientosDataService.newMovimiento();
                    vm.movimiento.tipo = "Ingreso";
                    vm.movimientos = movimientosDataService.getMovimientos();
                });
        }

        vm.movimientos = movimientosDataService.getMovimientos();

    }

    function service($resource) {
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

        this.newMovimiento = function () {
            return new Movimiento();
        }

        this.insertingMovimiento = function (movimiento) {
            return movimiento.$save();
        }

        this.getMovimientos = function () {
            return Movimiento.query();
        }
    }
})();









