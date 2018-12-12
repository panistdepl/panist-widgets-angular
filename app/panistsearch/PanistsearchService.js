app.factory('panistSearchService', ['$http', '$rootScope', function ($http, $rootScope) {
    return {
        search: function (scope) {
            var idc;
            // We create the url to call
            var url = $rootScope.panistConfigDefault.panistApi; //vd panist
        
            var selectedObj = localStorage.getItem("idc"); //On récupére le trigramme couperin sélectionné de la liste des établissements
            if (selectedObj != undefined) {
                try {
                    idc = JSON.parse(localStorage.getItem("idc")).value.id;
                }
                catch (e) {
                    console.log(e);
                    return false;
                }
            }
            var idcFromConfigFile = $rootScope.panistConfigDefault.idc; //On récupére le trigramme couperin de configuration panist
            if (idc == null || idc == undefined) { 
                idc = idcFromConfigFile; 
            }
            if (idc != undefined && idc != null  && idc.trim() != '') {         
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
    }
    else return false;

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