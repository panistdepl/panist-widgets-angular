app.directive('panistFacets', function () {
    return {
        template:'' +
        '<div id="panist-widget-facets" style="opacity: 1;" ng-controller="PanistfacetsCtrl" ng-toggle="showFacets && aggregations">'+
            '<div class="panist-facets">'+
                '<h3 class="panist-facets-title">{{ panistConfigDefault.labels.facets["title"] || "Affiner votre recherche" }}</h3>'+
                '<form class="panist-facets" >'+
                    '<div class="panist-facet" ng-repeat="(facetName, facet) in aggregations">' +
                        '<h4 class="panist-facet-name" ng-click="shownFacet = !shownFacet;">{{ (panistConfigDefault.labels.facets[facetName] || facetName) | capitalize }}<div ng-class="shownFacet ? \'icon arrow\' : \'icon arrow flipped\'" ng-style="shownFacet && { width: \'silver\', display: \'inline-block\'} || { color: \'gold\', display: \'inline-block\' }"></div></h4>'+
                        '<div class="animate-switch-container" ng-switch on="facetName">'+
                            '<div class="panist-facet-checkbox corpus" ng-switch-when="corpusName" ng-if="shownFacet">'+
                                '<li ng-repeat="badge in facet.buckets"><label><input type="checkbox" ng-model="badge.isChecked" ng-click="submitFacetSearch(aggregations)">{{ badge.key | capitalize}}<span class="panist-facet-checkbox-badge" >{{ badge.docCount | numberize }}</span></label></li>'+
                            '</div>'+
                            '<div class="panist-facet-checkbox language" ng-switch-when="language" ng-if="shownFacet">'+
                                '<li ng-repeat="badge in facet.buckets"><label><input type="checkbox" ng-model="badge.isChecked" ng-click="submitFacetSearch(aggregations)">{{ badge.key | languagize:panistConfigDefault.labels.facets["traduction"] }}<span class="panist-facet-checkbox-badge" >{{ badge.docCount | numberize }}</span></label></li>'+
                            '</div>'+
                            '<div class="panist-facet-checkbox wos" ng-switch-when="categories.wos" ng-if="shownFacet">'+
                                '<li ng-repeat="badge in facet.buckets" title="{{badge.key | capitalize}}"><label><input type="checkbox" ng-model="badge.isChecked" ng-click="submitFacetSearch(aggregations)" >{{ badge.key  | capitalize | ellipse:false:27:"..."   }}<span class="panist-facet-checkbox-badge" >{{ badge.docCount | numberize }}</span></label></li>'+
                            '</div>'+
                            '<div class="panist-facet-checkbox wos" ng-switch-when="wos" ng-if="shownFacet">'+
                                'Un bug est survenu :/'+
                            '</div>'+
                            '<div class="panist-facet-checkbox inist" ng-switch-when="categories.inist" ng-if="shownFacet">'+
                                '<li ng-repeat="badge in facet.buckets" title="{{badge.key | capitalize}}"><label><input type="checkbox" ng-model="badge.isChecked" ng-click="submitFacetSearch(aggregations)" >{{ badge.key  | capitalize | ellipse:false:27:"..."   }}<span class="panist-facet-checkbox-badge" >{{ badge.docCount | numberize }}</span></label></li>'+
                            '</div>'+
                            '<div class="panist-facet-checkbox inist" ng-switch-when="inist" ng-if="shownFacet">'+
                                'Un bug est survenu :/'+
                            '</div>'+
                            '<div class="panist-facet-checkbox scopus" ng-switch-when="categories.scopus" ng-if="shownFacet">'+
                                '<li ng-repeat="badge in facet.buckets" title="{{badge.key | capitalize}}"><label><input type="checkbox" ng-model="badge.isChecked" ng-click="submitFacetSearch(aggregations)" >{{ badge.key  | capitalize | ellipse:false:27:"..."   }}<span class="panist-facet-checkbox-badge" >{{ badge.docCount | numberize }}</span></label></li>'+
                            '</div>'+
                            '<div class="panist-facet-checkbox scopus" ng-switch-when="scopus" ng-if="shownFacet">'+
                                'Un bug est survenu :/'+
                            '</div>'+
                            '<div class="panist-facet-checkbox scienceMetrix" ng-switch-when="categories.scienceMetrix" ng-if="shownFacet">'+
                                '<li ng-repeat="badge in facet.buckets" title="{{badge.key | capitalize}}"><label><input type="checkbox" ng-model="badge.isChecked" ng-click="submitFacetSearch(aggregations)" >{{ badge.key  | capitalize | ellipse:false:27:"..."   }}<span class="panist-facet-checkbox-badge" >{{ badge.docCount | numberize }}</span></label></li>'+
                            '</div>'+
                            '<div class="panist-facet-checkbox scienceMetrix" ng-switch-when="scienceMetrix" ng-if="shownFacet">'+
                                'Un bug est survenu :/'+
                            '</div>'+

                            '<div class="panist-facet-checkbox teeft" ng-switch-when="keywords.teeft" ng-if="shownFacet">'+
                                '<li ng-repeat="badge in facet.buckets" title="{{badge.key | capitalize}}"><label><input type="checkbox" ng-model="badge.isChecked" ng-click="submitFacetSearch(aggregations)" >{{ badge.key  | capitalize | ellipse:false:27:"..."   }}<span class="panist-facet-checkbox-badge" >{{ badge.docCount | numberize }}</span></label></li>'+
                            '</div>'+
                            '<div class="panist-facet-checkbox teeft" ng-switch-when="teeft" ng-if="shownFacet">'+
                                'Un bug est survenu :/'+
                            '</div>'+

                            '<div class="panist-facet-copyrightdate" ng-switch-when="copyrightDate" ng-if="shownFacet">' +
                                '<div ng-if="!panistConfigDefault.slider">' +
                                    'Entre ' +
                                    '<input type="number" min="{{ facet.buckets[0].fromAsString }}" max="{{ facet.buckets[0].toAsString }}" ng-model="facet.buckets[0].bot" ng-change="submitFacetSearch(aggregations)" >' +
                                    ' et ' +
                                    '<input type="number" min="{{ facet.buckets[0].fromAsString }}" max="{{ facet.buckets[0].toAsString }}" ng-model="facet.buckets[0].top" ng-change="submitFacetSearch(aggregations)" >' +
                                    //'<span class="panist-facet-copyrightdate-badge" >{{ facet.buckets[0].doc_count | numberize }}</span></label>' +
                                '</div>' +
                                '<div ng-if="panistConfigDefault.slider">' +
                                    '<rzslider class="rzslider" rz-slider-floor="facet.buckets[0].fromAsString" rz-slider-ceil="facet.buckets[0].toAsString" rz-slider-model="facet.buckets[0].bot" rz-slider-high="facet.buckets[0].top" rz-slider-step="1" ></rzslider>'+
                                    //'<span class="panist-facet-copyrightdate-badge" >{{ facet.buckets[0].doc_count | numberize }}</span></label>' +
                                '</div>'+
                            '</div>'+
                            '<div class="panist-facet-pubdate" ng-switch-when="publicationDate" ng-if="shownFacet">' +
                                '<div ng-if="!panistConfigDefault.slider">' +
                                    'Entre ' +
                                    '<input type="number" min="{{ facet.buckets[0].fromAsString }}" max="{{ facet.buckets[0].toAsString }}" ng-model="facet.buckets[0].bot" ng-change="submitFacetSearch(aggregations)" >' +
                                    ' et ' +
                                    '<input type="number" min="{{ facet.buckets[0].fromAsString }}" max="{{ facet.buckets[0].toAsString }}" ng-model="facet.buckets[0].top" ng-change="submitFacetSearch(aggregations)" >' +
                                    //'<span class="panist-facet-pubdate-badge" >{{ facet.buckets[0].doc_count | numberize }}</span></label>' +
                                '</div>' +
                                '<div ng-if="panistConfigDefault.slider">' +
                                    '<rzslider class="rzslider" rz-slider-floor="facet.buckets[0].fromAsString" rz-slider-ceil="facet.buckets[0].toAsString" rz-slider-model="facet.buckets[0].bot" rz-slider-high="facet.buckets[0].top" rz-slider-step="1" ></rzslider>'+
                                    //'<span class="panist-facet-pubdate-badge" >{{ facet.buckets[0].doc_count | numberize }}</span></label>' +
                                '</div>'+
                            '</div>'+
                            '<div class="panist-facet-quality" ng-switch-when="score" ng-if="shownFacet">' +
                                '<div ng-if="!panistConfigDefault.slider">' +
                                    'Entre ' +
                                    '<input type="number" min="0" max="10" ng-model="facet.buckets[0].bot" ng-change="submitFacetSearch(aggregations)" >' +
                                    ' et ' +
                                    '<input type="number" min="0" max="10" ng-model="facet.buckets[0].top" ng-change="submitFacetSearch(aggregations)" >' +
                                    //'<span class="panist-facet-pubdate-badge" >{{ facet.buckets[0].doc_count | numberize }}</span></label>' +
                                '</div>' +
                                '<div ng-if="panistConfigDefault.slider">' +
                                    '<rzslider class="rzslider" rz-slider-floor="0" rz-slider-ceil="10" rz-slider-model="facet.buckets[0].bot" rz-slider-high="facet.buckets[0].top" rz-slider-step="1" ></rzslider>'+
                                    //'<span class="panist-facet-pubdate-badge" >{{ facet.buckets[0].doc_count | numberize }}</span></label>' +
                                '</div>'+
                            '</div>'+
                            '<div class="panist-facet-checkbox {{ facetName }}" ng-switch-default>'+
                                '<li ng-repeat="badge in facet.buckets" title="{{badge.key | capitalize}}"><label><input type="checkbox" ng-model="badge.isChecked" ng-click="submitFacetSearch(aggregations)" >{{ badge.key  | capitalize | ellipse:false:27:"..."   }}<span class="panist-facet-checkbox-badge" >{{ badge.docCount | numberize }}</span></label></li>'+
                            '</div>'+
                        '</div>'+
                    '</div>' +
                '</form>'+
            '</div>'+
        '</div>' +
        ''
    };
});