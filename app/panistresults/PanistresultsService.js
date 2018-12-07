app.factory('panistResultsService', ['$http', '$rootScope', function ($http, $rootScope) {
    return {
        search: function (page) {

            // We create the url to call, using the same Query for the basic search
            var url = $rootScope.currentPageURI;
            if ($rootScope.currentFacetsURI) {
                url = $rootScope.currentFacetsURI;
            }
            var from = "&from=";

            from += page;
            url += from;

            // We calculate the request time
            $rootScope.searchTimeA = new Date().getTime();

            return $http.jsonp(url + "&callback=JSON_CALLBACK");

        },
        defaultSearch: function (q) {

            // We create the url to call
            var url = $rootScope.panistConfigDefault.panistApi;
           
            url += "/document/?q=";
            var query = (q) ? q.toString() : "";
            url += (query != "") ? query : "*";
         
            url += "&stats=1";
            if ($rootScope.defaultSort) {
                url += "&sortBy=" + $rootScope.defaultSort;
            } else if ($rootScope.panistConfigDefault.defaultSort) {
                url += "&sortBy=" + $rootScope.panistConfigDefault.defaultSort;
            }
           
            var operator = "&defaultOperator=" + $rootScope.panistConfigDefault.operator;

            var facets = "&facet=" + $rootScope.panistConfigDefault.facetsToLoad.join();
            var size = "&size=" + $rootScope.panistConfigDefault.pageSize;
            url += operator + facets + size + "&sid=panist-widgets";
          
            // We save the url
            $rootScope.currentPageURI = url;

            // We calculate the request time
            $rootScope.searchTimeA = new Date().getTime();
            
            return $http.jsonp(url + "&callback=JSON_CALLBACK");

        },
        sortedSearch: function (sort) {
            var defaultSort = $rootScope.panistConfigDefault.defaultSort;
            var url = "";

            var sortByRegexp = /(&sortBy=)[a-zA-Z\[\],]*(&?)/;

            if (defaultSort) {
                sort += "," + defaultSort;
            }
            if (!defaultSort && !sort) {
                url = $rootScope.currentPageURI.replace(sortByRegexp, "");
                $rootScope.currentPageURI = url;
                if ($rootScope.currentFacetsURI) {
                    url = $rootScope.currentFacetsURI.replace(sortByRegexp, "");
                    $rootScope.currentFacetsURI = url;
                }
            } else {
                url = $rootScope.currentPageURI.replace(sortByRegexp, "$1" + sort + "$2");
                $rootScope.currentPageURI = url;
                if ($rootScope.currentFacetsURI) {
                    url = $rootScope.currentFacetsURI.replace(sortByRegexp, "$1" + sort + "$2");
                    $rootScope.currentFacetsURI = url;
                }
            }
            if (sort && url.indexOf("sortBy") == -1) {
                url = $rootScope.currentPageURI + "&sortBy=" + sort;
                $rootScope.currentPageURI = url;
                if ($rootScope.currentFacetsURI) {
                    url = $rootScope.currentFacetsURI + "&sortBy=" + sort;
                    $rootScope.currentFacetsURI = url;
                }
            }

            // We create the url to call, using the same Query for the basic search

            
            // We calculate the request time
            $rootScope.searchTimeA = new Date().getTime();

            return $http.jsonp(url + "&callback=JSON_CALLBACK");

        }
    }
}]);