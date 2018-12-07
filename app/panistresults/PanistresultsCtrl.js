app.controller('PanistresultsCtrl', ['$scope', '$rootScope', 'panistResultsService', function ($scope, $rootScope, panistResultsService) {

    $rootScope.showResults = false;
    $rootScope.showFulltext = $rootScope.panistConfigDefault.showFulltext;
    $rootScope.showMetadonnee = $rootScope.panistConfigDefault.showMetadonnee;
    $rootScope.defaultSort = $rootScope.panistConfigDefault.defaultSort;

    // If there is a default request, show the loading gif
    if($rootScope.panistConfigDefault.query !== false) $rootScope.showLoading = true;

    // If there is a default request to query on page loading we do it
    if($rootScope.panistConfigDefault.query !== false){
        panistResultsService.defaultSearch($rootScope.panistConfigDefault.query)
            .success(function (result) {
                $rootScope.showError = false;

                // We calculate the time taken to make the search
                $rootScope.searchTimeB = new Date().getTime();
                $rootScope.totalSearchTime=(($rootScope.searchTimeB-$rootScope.searchTimeA)/1000).toFixed(2);
                $rootScope.noresult = (result.total ===0);
                if(!$rootScope.noresult) {
                    $rootScope.elasticSearchTime = (result.stats['elasticsearch'].took / 1000).toFixed(2);
                    $rootScope.panistSearchTime = (result.stats['istex-api'].took / 1000).toFixed(2);
                    $rootScope.reseauSearchTime = ($rootScope.totalSearchTime - $rootScope.elasticSearchTime - $rootScope.panistSearchTime).toFixed(2);

                    // We associate the datas to the variables used in the directives with {{ }}
                    $rootScope.documents = result.hits;
                    $rootScope.total = result.total;
                    $rootScope.nextPageURI = result.nextPageURI;
                    $rootScope.aggregations = result.aggregations;

                    if ($rootScope.aggregations.publicationDate) {
                        $rootScope.aggregations.publicationDate.buckets[0].top = parseInt($rootScope.aggregations.publicationDate.buckets[0].toAsString);
                        $rootScope.aggregations.publicationDate.buckets[0].bot = parseInt($rootScope.aggregations.publicationDate.buckets[0].fromAsString || 0);
                    }
                    if ($rootScope.aggregations.copyrightDate) {
                        $rootScope.aggregations.copyrightDate.buckets[0].top = parseInt($rootScope.aggregations.copyrightDate.buckets[0].toAsString);
                        $rootScope.aggregations.copyrightDate.buckets[0].bot = parseInt($rootScope.aggregations.copyrightDate.buckets[0].fromAsString || 0);
                    }
                    if ($rootScope.aggregations.score) {
                        $rootScope.aggregations.score.buckets[0].top = 10;
                        $rootScope.aggregations.score.buckets[0].bot = 0;
                    }


                    // We initialise the page system if there is one
                    $rootScope.maxPagesInPagination = $rootScope.panistConfigDefault.maxPagesInPagination;
                    $rootScope.nbrPages = Math.ceil($rootScope.total / $rootScope.panistConfigDefault.pageSize);
                    $rootScope.firstPageURI = {"id": 1};
                    $rootScope.lastPageURI = {"id": $rootScope.nbrPages};
                    if ($rootScope.nbrPages < $rootScope.maxPagesInPagination)
                        $rootScope.maxPagesInPagination = $rootScope.nbrPages;
                    $rootScope.pageCourante = 1;
                    var tab = [];
                    for (i = 1; i <= $rootScope.maxPagesInPagination; i++) {
                        tab.push({"id": i});
                    }
                    $rootScope.pages = tab;
                    // We allow results and facets to appear
                    $rootScope.showResults = true;
                    $rootScope.showFacets = true;
                    $rootScope.showLoading = false;
                }
            })
            .error(function (e) {
                $rootScope.showLoading = false;
                $rootScope.showError = true;
                console.error("ERROR : Default Search");
            });
    }

    $scope.selectPage = function(numPage){

        $rootScope.showLoading = true;

        var page = (numPage-1)*$rootScope.panistConfigDefault.pageSize;

        if($rootScope.panistConfigDefault.pageSize + page > $rootScope.panistConfigDefault.maxResults ){
            page = $rootScope.panistConfigDefault.maxResults - $rootScope.panistConfigDefault.pageSize;
            numPage = page/$rootScope.panistConfigDefault.pageSize+1;
        }

        $rootScope.pageCourante = numPage;

        if ( ($rootScope.pageCourante >= 1+Math.ceil($rootScope.maxPagesInPagination/2)) && ($rootScope.pageCourante <= $rootScope.nbrPages - Math.ceil(($rootScope.maxPagesInPagination/2))) ){
            $rootScope.pageStart = $rootScope.pageCourante - (Math.floor($rootScope.maxPagesInPagination/2 -0.5));
            $rootScope.pageEnd = $rootScope.pageCourante + (Math.ceil($rootScope.maxPagesInPagination/2 -0.5));
        }else if($rootScope.pageCourante < 1+Math.ceil($rootScope.maxPagesInPagination/2)){
            $rootScope.pageStart = 1;
            $rootScope.pageEnd = $rootScope.maxPagesInPagination;
        }else if($rootScope.pageCourante > $rootScope.nbrPages - Math.ceil(($rootScope.maxPagesInPagination/2))){
            $rootScope.pageStart = $rootScope.nbrPages - $rootScope.maxPagesInPagination +1;
            $rootScope.pageEnd = $rootScope.nbrPages;
        }
        var tab = [];
        for (i = $rootScope.pageStart ; i <= $rootScope.pageEnd; i++) {
            tab.push({"id":i});
        }
        $rootScope.pages=tab;

        $rootScope.hideResults = true;
        $rootScope.hideStats = true;

        panistResultsService.search(page)
            .success(function (result) {
                $rootScope.showError = false;

                // We calculate the time taken to make the search with facets
                $rootScope.searchTimeB = new Date().getTime();
                $rootScope.totalSearchTime=(($rootScope.searchTimeB-$rootScope.searchTimeA)/1000).toFixed(2);
                $rootScope.elasticSearchTime=(result.stats['elasticsearch'].took/1000).toFixed(2);
                $rootScope.panistSearchTime=(result.stats['istex-api'].took/1000).toFixed(2);
                $rootScope.reseauSearchTime=($rootScope.totalSearchTime-$rootScope.elasticSearchTime-$rootScope.panistSearchTime).toFixed(2);

                $rootScope.documents = result.hits;
                $rootScope.nextPageURI = result.nextPageURI;

                $rootScope.hideResults = false;
                $rootScope.hideStats = false;
                $rootScope.showLoading = false;
            })
            .error(function (e) {
                $rootScope.showLoading = false;
                $rootScope.showError = true;
                console.error("ERROR : Pagination");
            });
    }

    $scope.sortBy = function(sort){

        $rootScope.showLoading = true;

        $rootScope.hideResults = true;
        $rootScope.hideStats = true;

        if($rootScope.panistConfigDefault.defaultSort){
            $rootScope.defaultSort = sort + "," + $rootScope.panistConfigDefault.defaultSort;
        }else{
            $rootScope.defaultSort = sort;
        }
        
        panistResultsService.sortedSearch(sort)
            .success(function (result) {
                $rootScope.showError = false;

                // We calculate the time taken to make the search with facets
                $rootScope.searchTimeB = new Date().getTime();
                $rootScope.totalSearchTime=(($rootScope.searchTimeB-$rootScope.searchTimeA)/1000).toFixed(2);
                $rootScope.elasticSearchTime=(result.stats['elasticsearch'].took/1000).toFixed(2);
                $rootScope.panistSearchTime=(result.stats['istex-api'].took/1000).toFixed(2);
                $rootScope.reseauSearchTime=($rootScope.totalSearchTime-$rootScope.elasticSearchTime-$rootScope.panistSearchTime).toFixed(2);

                $rootScope.documents = result.hits;
                $rootScope.nextPageURI = result.nextPageURI;
                $rootScope.pageCourante = 1;

                $rootScope.hideResults = false;
                $rootScope.hideStats = false;
                $rootScope.showLoading = false;
            })
            .error(function (e) {
                $rootScope.showLoading = false;
                $rootScope.showError = true;
                console.error("ERROR : SortBy");
            });
            
    }

}]);