"use strict";

angular
    .module('template', ['ngResource', 'ngAnimate', 'ui.router', 'navbar', 'login', 'dashboard', 'register', 'forgotPassword'])
    .constant('settings', {
        urlBase: 'http://localhost:3030'
    });