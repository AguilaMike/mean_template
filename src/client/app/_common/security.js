(function () {

    function interceptorsRegistry($httpProvider) {
        $httpProvider.interceptors.push(securityInterceptor);
    }

    function securityInterceptor($injector,$q, $cookieStore, $rootScope) {
        function requestInterceptor (request) {
            request.headers["sessionId"] = $cookieStore.get("sessionId");
            return request || $q.when(request);
        };
        function responseErrorInterceptor(response) {
            var state = $injector.get('$state');
            if (response.status === 401) {
                state.go('login');
            }
            return $q.reject(response);
        };
		    return {
          request:requestInterceptor,
          responseError:responseErrorInterceptor
          };
    }
    angular.module('template').config(interceptorsRegistry);
}());
