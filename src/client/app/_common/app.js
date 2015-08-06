"use strict";

angular
    .module('template', ['ngResource', 'ngAnimate', 'ui.router', 'navbar', 'login', 'dashboard', 'register'])
    .constant('settings', {
        urlBase: 'http://localhost:3030'
    });