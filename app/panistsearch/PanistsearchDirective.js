app.directive('panistSearch', function () {
    return {
        template: '' +
            '<div id="panist-widget-search" ng-controller="PanistsearchCtrl" >' +
            '<form class="panist-search-form">' +
                '<div class="input-group">'+
                    '<input class="form-control adding-logo-to-input" type="search" value="" placeholder="{{panistConfigDefault.labels.search.placeholder.main || \'Votre requête ici ...\'}}" ng-model="query" ng-focus="panistConfigDefault.focusInputQueryOnLoad">'+
                    '<span class="input-group-btn">'+
                        '<input type="submit" class="btn btn-default" ng-click="search()" value="Rechercher">'+
                    '</span>'+
                    
                '</div>'+
                '<div class="panist-advanced-wrapper" ng-if="panistConfigDefault.advancedToLoad">' +
                    '<div class="panist-advanced-button" ng-click="toggleAdvanced()" ng-if="!panistConfigDefault.advancedExpanded">' +
                        '<a href="" >{{ (panistConfigDefault.labels.search["advancedTitle"] || "Recherche avancée") | capitalize}}</a>' +
                    '</div>' +
                    '<div class="panist-advanced-inputs">'+
                    '<div class="panist-advanced" ng-repeat="(advancedName, advanced) in advancedQuery" ng-show="showAdvanced">' +
                        '<h5 class="panist-advanced-name">{{ (panistConfigDefault.labels.search[advancedName] || advancedName) | capitalize}}</h5>'+
                        '<div class="panist-advanced-{{advancedName}}" >'+
                            '<input class="panist-search-advanced-input" type="search" ng-model="advancedQuery[advancedName]" placeholder="{{panistConfigDefault.labels.search.placeholder[advancedName]}}">'+
                        '</div>'+
                    '</div>'+
                    '</div>'+
                '</div>' +
                '<p class="panist-search-error"></p>'+
                '<div class="panist-search-loading" title="Recherche en cours" ng-toggle="showLoading && !noresult" ></div>'+
            '</form>' +
        '</div>'
        };
});
