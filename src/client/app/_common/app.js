"use strict";

angular
    .module('template', ['ngResource', 'ui.router', 'main', 'navbar', 'footer', 'dashboard', 'user', 'teams'])
    .constant('settings', {
        urlBase: 'http://localhost:3030'
    });