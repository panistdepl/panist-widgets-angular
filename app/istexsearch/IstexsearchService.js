app.factory('istexSearchService', ['$http', '$rootScope', function ($http, $rootScope) {
    return {
        search: function (scope) {

            // We create the url to call
            var url = $rootScope.istexConfigDefault.istexApi; //vd panist

            var selectedObj = localStorage.getItem("idc"); //On réscupére le trigramme couperin
            var idc1;
            if (selectedObj != undefined) {
                idc1 = JSON.parse(localStorage.getItem("idc")).value.id;
            }
            var idc2 = $rootScope.istexConfigDefault.idc; //On réscupére le trigramme couperin
            if (idc1) {
                idc = idc1;
            } else if (idc2) {
                idc = idc2;
            } else {
                return false;
            }
            url += "/document/?q=";
            var query = (scope.query) ? scope.query.toString() : "";
            var advanced = this.advancedSearch(scope.advancedQuery);
            url += (query != "") ? query : "*";
            url += (advanced != "") ? advanced : "";
            url += " AND grantees.raw:" + idc;
            url += " &output=*";
            url += "&stats=1";
            if ($rootScope.defaultSort) {
                url += "&sortBy=" + $rootScope.defaultSort;
            } else if ($rootScope.istexConfigDefault.defaultSort) {
                url += "&sortBy=" + $rootScope.istexConfigDefault.defaultSort;
            }
            var operator = "&defaultOperator=" + $rootScope.istexConfigDefault.operator;
            var facets = "&facet=" + $rootScope.istexConfigDefault.facetsToLoad.join();
            var size = "&size=" + $rootScope.istexConfigDefault.pageSize;
            url += operator + facets + size + "&sid=istex-widgets";

            // We save the url
            $rootScope.currentPageURI = url;

            // We calculate the request time
            $rootScope.searchTimeA = new Date().getTime();

            return $http.jsonp(url + "&callback=JSON_CALLBACK");

        },
        advancedSearch: function (advancedQuery) {
            var advanced = "";
            for (var prop in advancedQuery) {
                if (Object.prototype.hasOwnProperty.call(advancedQuery, prop) && advancedQuery[prop] != "") {
                    advanced += " AND " + prop + ":" + advancedQuery[prop];
                }
            }
            return advanced;
        }
    }
}]);