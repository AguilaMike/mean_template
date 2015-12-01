//var angular = angular;
//var moduleName = "template"
"use strict";

/** external and own modules */
var dependencies = ['security', 'url', 'components', 'states']
	/** common values to be used across the application */
var settings = {
	urlBase: 'http://localhost:3030'
};
angular
	.module('template', dependencies)
	.constant('settings', settings);


angular
	.module('components', ['mainsection', 'navbar', 'footerbar']);

angular
	.module('states', ['dashboard', 'user', 'transactions']);
