app.directive('istexSearch', function () {
    return {
        template: '' +
            '<div id="istex-widget-search" ng-controller="IstexsearchCtrl" >' +
            '<form>' +
                '<div class="input-group">'+
                    '<input class="form-control adding-logo-to-input" type="search" value="" placeholder="{{istexConfigDefault.labels.search.placeholder.main || \'Votre requête ici ...\'}}" ng-model="query" ng-focus="istexConfigDefault.focusInputQueryOnLoad">'+
                    '<span class="input-group-btn">'+
                        '<input type="submit" class="btn btn-default" ng-click="search()" value="Rechercher">'+
                    '</span>'+
                    
                '</div>'+
                '<div class="istex-advanced-wrapper" ng-if="istexConfigDefault.advancedToLoad">' +
                    '<div class="istex-advanced-button" ng-click="toggleAdvanced()" ng-if="!istexConfigDefault.advancedExpanded">' +
                        '<a href="" >{{ (istexConfigDefault.labels.search["advancedTitle"] || "Recherche avancée") | capitalize}}</a>' +
                    '</div>' +
                    '<div class="istex-advanced-inputs">'+
                    '<div class="istex-advanced" ng-repeat="(advancedName, advanced) in advancedQuery" ng-show="showAdvanced">' +
                        '<h5 class="istex-advanced-name">{{ (istexConfigDefault.labels.search[advancedName] || advancedName) | capitalize}}</h5>'+
                        '<div class="istex-advanced-{{advancedName}}" >'+
                            '<input class="istex-search-advanced-input" type="search" ng-model="advancedQuery[advancedName]" placeholder="{{istexConfigDefault.labels.search.placeholder[advancedName]}}">'+
                        '</div>'+
                    '</div>'+
                    '</div>'+
                '</div>' +
                '<p class="istex-search-error"></p>'+
                '<div class="istex-search-loading" title="Recherche en cours" ng-toggle="showLoading && !noresult" ></div>'+
            '</form>' +
        '</div>'
        };
});