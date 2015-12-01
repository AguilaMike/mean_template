"use strict";
(function () {
	var componentName = 'editTransaction';
	angular
		.module(componentName, ['ui.router', 'formly', 'formlyBootstrap', 'transactionsDataService'])
		.directive(componentName, directive)

	function directive() {
		return {
			templateUrl: 'app/states/transactions/edit/transactions.edit.html',
			controller: controller,
			controllerAs: componentName,
			bindToController: true,
			scope: {
				transactionid: "="
			}
		}
	}

	function controller($state, transactionsDataService) {
		var vm = this;
		vm.title = "New Transaction";

		vm.fields = [
			{
				key: 'type',
				type: 'input',
				templateOptions: {
					label: 'Type',
					placeholder: 'income or expense',
					required: true,
					type: 'text'
				}
            },
			{
				key: 'category',
				type: 'input',
				templateOptions: {
					label: 'Category',
					placeholder: 'transaction category',
					required: true,
					type: 'text'
				}
            }, {
				key: 'date',
				type: 'input',
				templateOptions: {
					label: 'Date',
					required: false,
					type: 'date'
				}
            }, {
				key: 'amount',
				type: 'input',
				templateOptions: {
					label: 'Amount',
					placeholder: 'amount in euros',
					required: true,
					type: 'number'
				}
            },
        ]

		vm.editTransaction = function () {
			if (true) {
				transactionsDataService
					.saving(vm.transaction)
					.then(function () {
						$state.go('listTransactions');
					});
			} else {
				transactionsDataService
					.updating(vm.transaction)
					.then(function () {
						$state.go('listTransactions');
					});
			}
		}

		function init() {
			if (vm.transactionid) {
				transactionsDataService.getting(vm.transactionid)
					.$promise.then(function (data) {
						var milliseconds = Date.parse(data.date)
						if (!isNaN(milliseconds)) {
							data.date = new Date(milliseconds);
						}
						vm.transaction = data;
					});
			} else {
				vm.transaction = transactionsDataService.new();
				vm.transaction.type = "Income";
				vm.transaction.date = new Date();
				vm.transaction.amount = 0;
			}
		}

		init();
	}


})();
