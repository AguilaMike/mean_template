"use strict";

angular
    .module('template', ['ngResource', 'ngMessages', 'ngAnimate', 'ui.router', 'navbar', 'login', 'dashboard'])
    .constant('settings', {
        urlBase: 'http://localhost:3030'
    });