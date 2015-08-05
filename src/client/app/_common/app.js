"use strict";

angular
    .module('template', ['ngResource', 'ngMessages' ,'ngAnimate','ui.router'])
    .constant('settings', {
        urlBase: 'http://localhost:3030'
    });
