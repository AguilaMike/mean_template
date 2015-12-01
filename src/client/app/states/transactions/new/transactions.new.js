"use strict";
(function () {
	var stateName = 'newTransaction';
	angular
		.module(stateName, ['ui.router', 'formly', 'formlyBootstrap','editTransaction' 'transactionsDataService'])
		.config(stateConfig)
		.directive(stateName, directive)

	function stateConfig($stateProvider) {
		$stateProvider
			.state(stateName, {
				url: '/transactions/new',
				template: '<new-transaction></new-transaction>'
			});
	}


	function directive() {
		return {
			templateUrl: 'app/states/transactions/new/transactions.new.html',
			controller: controller,
			controllerAs: stateName,
			bindToController: true,
			scope: {}
		}
	}

	function controller($state, transactionsDataService) {
		var vm = this;
		vm.title = "New Transaction";

		
	}


})();
