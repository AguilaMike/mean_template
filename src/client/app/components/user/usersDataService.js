"use strict";
(function () {
    angular
        .module('usersData', ['ngResource', 'ngStorage'])
        .service('usersDataService', usersDataService)

    function usersDataService($resource, $q, $localStorage) {

        var User = $resource('/api/users');
        var UserId = $resource('/api/users/:id', null, {
            'update': {
                method: 'PUT'
            }
        });
        var Session = $resource('/api/users/sessions');

        this.newUser = function (email, password) {
            var user = new User();
            user.email = email;
            user.password = password;
            return user;
        }

        this.newSession = function (email, password) {
            var session = new Session();
            session.email = email;
            session.password = password;
            return session;
        }

        this.postingUser = function (user) {
            return user.$save()
                .then(function (response) {
                    $localStorage.xAccessToken = response.token;
                    return response;
                }, function (reason) {
                    return $q.reject(reason);
                });
        }

        this.postingSession = function (session) {
            return session.$save()
                .then(function (response) {
                    $localStorage.xAccessToken = response.token;
                    return response;
                }, function (reason) {
                    return $q.reject(reason);
                });
        }

        this.gettingUser = function () {
            return User.get().$promise;
        }

        this.updatingUser = function (id, user) {
            var query = {
                id: id,
                user: user
            }
            return UserId.update(query);
        }

    }


})();