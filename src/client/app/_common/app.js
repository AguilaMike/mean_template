"use strict";

angular
    .module('template', ['ngResource', 'ngCookies','ngMessages' ,'ngAnimate','ui.router'])
    .constant('settings', {
        urlBase: 'http://localhost:3030'
    });
