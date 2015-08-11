"use strict";

angular
    .module('template', ['ngResource', 'ngAnimate', 'ui.router', 'main', 'navbar', 'footer', 'dashboard', 'user'])
    .constant('settings', {
        urlBase: 'http://localhost:3030'
    });