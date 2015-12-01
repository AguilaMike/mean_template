"use strict";
(function () {
	var stateName = 'newTransaction';
	angular
		.module(stateName, ['ui.router', 'editTransaction'])
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
			template: '<edit-transaction></edit-transaction>',
			//controller: controller,
			//controllerAs: stateName,
			//bindToController: true,
			scope: {}
		}
	}



})();
