var angular = angular;
var moduleName = "template"
"use strict";

/** external and own modules */
var dependencies = ['ui.router', 'ngStorage', 'main', 'navbar', 'footer', 'dashboard', 'user']
/** common values to be used across the application */
var settings = {
    urlBase: 'http://localhost:3030'
};
angular
    .module(moduleName, dependencies)
    .constant('settings', settings);