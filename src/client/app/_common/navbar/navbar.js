"use strict";
(function () {
	/** Navigation bar, and logic to control user state */
	var componentName = "navbar";
	angular
		.module(componentName, ['ui.router', 'ngStorage'])
		.directive(componentName, directive)

	function directive() {
		return {
			templateUrl: 'app/_common/' + componentName + '/' + componentName + '.html',
			controller: controller,
			controllerAs: componentName,
			bindToController: true
		}
	}

	function controller($state, $localStorage, $rootScope) {
		var vm = this;

		vm.isActive = function (state) {
			return $state.is(state);
		}
		vm.logout = function () {
			// TODO: create logout component and move the state to it
			delete $localStorage['xAccessToken'];
			$rootScope.isLogged = false;
			$state.go('dashboard');
		}

		init();

		function init() {
			$rootScope.isLogged = $localStorage['xAccessToken'] != null;
		}
	}
})();