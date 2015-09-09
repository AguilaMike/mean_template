"use strict";
(function () {
    angular
        .module('usersData', ['ngResource'])
        .service('usersDataService', usersDataService)

    function usersDataService($resource) {

        var User = $resource('/api/users');

        this.newUser = function (email, password) {
            var user = new User();
            user.email = email;
            user.password = password;
            return user;
        }

        this.postingUser = function (user) {
            return user.$save();
        }

        this.gettingUser = function () {
            return User.get();
        }

    }


})();