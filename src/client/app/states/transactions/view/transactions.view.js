"use strict";
(function () {
	var stateName = 'viewTransaction';
	angular
		.module(stateName, ['ui.router', 'editTransaction'])
		.config(stateConfig)

	function stateConfig($stateProvider) {
		$stateProvider
			.state(stateName, {
				url: '/transactions/view/:id',
				template: '<edit-transaction transactionid="viewTransaction.transactionId"></edit-transaction>',
				controllerAs: 'viewTransaction',
				controller: function ($stateParams) {
					this.transactionId = $stateParams.id;
				}
			});
	}

})();
