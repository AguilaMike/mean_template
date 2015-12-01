"use strict";
(function () {
	var stateName = 'viewTransaction';
	angular
		.module(stateName, ['ui.router', 'formly', 'editTransaction','formlyBootstrap', 'transactionsDataService'])
		.config(stateConfig)

	function stateConfig($stateProvider) {
		$stateProvider
			.state(stateName, {
				url: '/transactions/view/:id',
				template: '<edit-transaction></edit-transaction>'
			});
	}

})();
