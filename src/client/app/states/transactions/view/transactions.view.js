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
				template: '{{vm.transactionId}}<edit-transaction transactionid="vm.transactionId"></edit-transaction>',
				controllerAs: 'vm',
				controller: function ($stateParams) {
					this.transactionId = $stateParams.id;
				}
			});
	}

})();
