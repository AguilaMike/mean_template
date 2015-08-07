"use strict";

angular
    .module('template', ['ngResource', 'ngAnimate', 'ui.router', 'navbar', 'dashboard', 'user'])
    .constant('settings', {
        urlBase: 'http://localhost:3030'
    });