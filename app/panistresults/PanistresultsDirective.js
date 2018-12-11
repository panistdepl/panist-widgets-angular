app.directive('panistResults', function () {
    return {
        template: '' +
            '<div class="panist-results-noresult" ng-show="noresult">' +
            '{{panistConfigDefault.labels.results.noresult || "Il n\'y a pas de résultat à afficher !"}}' +
            '</div>' +
            '<div class="panist-results-error" ng-show="showError">' +
            'Une erreur est survenue, veuillez réessayer plus tard. Si cette erreur persiste, vous pouvez envoyer un mail à <a href="mailto:panist-contact@univ-lorraine.fr" target="_blank">l\'équipe PANIST-SNU</a>' +
            '</div>' +
            '<div class="panist-results-error" ng-show="showSelectEtab">' +
            '<div class="alert alert-warning" role="alert">' +
            'Veuillez sélectionner un établissement' +
            '</div>' +
            '</div>' +
            '<div class="panist-hidebutton" ng-click="panistConfigDefault.hideButton = false;" ng-show="!noresult && panistConfigDefault.hideButton && !showError" title="{{panistConfigDefault.labels.results.showResult || \'Cliquez pour afficher les résultats\'}}">{{ total || ". . . . . . . . ." | numberize }} documents</div>' +
            '<div id="panist-widget-results" style="opacity: 1;" ng-controller="PanistresultsCtrl" ng-toggle="showResults" ng-show="!noresult && !panistConfigDefault.hideButton">' +
            '<div class="panist-results-items-stats" ng-toggle="!hideStats">' +
            'Environ {{ total | numberize }} résultats <span title="Réseau : {{reseauSearchTime}} sec, Moteur de recherche : {{elasticSearchTime}} sec, Traitements de l\'API : {{panistSearchTime}} sec" ng-if="panistConfigDefault.showQuerySpeed">({{totalSearchTime}} secondes)</span>' +
            '</div>' +
            '<div class="panist-results-sort" >' +
            '<select class="input-sm form-control" ng-model="defaultSort" ng-change="sortBy(defaultSort)" >' +
            '<option ng-repeat="sort in panistConfigDefault.possibleSorts" value="{{sort.value}}">{{sort.name}}</option>' +
            '</select>' +
            //<input type="checkbox" ng-model="badge.isChecked" ng-click="submitFacetSearch(aggregations)">
            '</div>' +
            '<div class="panist-results-pagination" ng-if="panistConfigDefault.showPaginationTop">' +
            //'<a href="#" ng-click="selectPage(firstPageURI.id)" ng-if="pageCourante !== firstPageURI.id"> {{firstPageURI.id}} </a>'+
            '<a href="" class="panist-results-pagination-prec" title="Page précédente" ng-click="selectPage(pageCourante-1)" ng-if="pageCourante !== firstPageURI.id"> < </a>' +
            '<ul class="panist-results-pagination-plist">' +
            '<li ng-repeat="page in pages" >' +
            '<a href="" ng-click="selectPage(page.id)" ng-if="pageCourante !== page.id ">{{page.id}}</a>' +
            '<span class="panist-results-pagination-page-selected" ng-if="pageCourante === page.id">{{page.id}}</span>' +
            '</li>' +
            '</ul>' +
            '<a href="" class="panist-results-pagination-next" title="Page suivante" ng-click="selectPage(pageCourante+1)" ng-if="pageCourante !== lastPageURI.id"> > </a>' +
            //'<a href="#" ng-click="selectPage(lastPageURI.id)" ng-if="pageCourante !== lastPageURI.id"> {{lastPageURI.id}} </a>'+
            '</div>' +
            '<ol class="panist-results-items" ng-toggle="!hideResults">' +
            '<li class="panist-results-item" ng-repeat="document in documents">' +
            '<a class="panist-results-item-title" target="_blank" ng-if="panistConfigDefault.resultContent.title" ng-href="{{document.fulltext[0].uri | sidize | proxify:panistConfigDefault.proxyApi }}" >{{ document.title | ellipse:true:panistConfigDefault.titleLength:"..." }}</a>' +
            '<p class="panist-results-item-abstract" ng-if="document.abstract && panistConfigDefault.resultContent.abstract" title="{{ document.abstract }}">{{ document.abstract | ellipse:false:panistConfigDefault.abstractLength:"..."  }}</p>' +
            '<p class="panist-results-item-abstract" title="Pas de résumé" ng-if="!document.abstract  && panistConfigDefault.resultContent.abstract">{{ panistConfigDefault.labels.results[\'abstract\'] || "Pas de résumé disponible pour cet article" }}</p>' +
            '<p class="panist-results-item-author" ng-if="panistConfigDefault.resultContent.author" ><span ng-repeat="author in document.author">{{author.name}}. </span></p>' +
            '<p class="panist-results-item-journal" ng-if="panistConfigDefault.resultContent.journal">{{document.host.title}} vol.{{document.host.volume}}, page {{document.host.pages.first}} - {{document.host.pages.last}}</p>' +
            '<div class="panist-tag" ng-repeat="(name, value) in panistConfigDefault.tags">' +
            '<span ng-if="name==\'genre\'" ng-repeat="genre in document.genre" class="panist-tag">{{value}} {{ genre | capitalize }}</span>' +
            '<span ng-if="name!=\'genre\'" class="panist-tag">{{value}} {{ document[name] | capitalize }}</span>' +
            '</div>' +
            '<div ng-if="panistConfigDefault.qualityIndicator"><b>Qualité du fulltext</b> : <div class="star-rating" title="{{document.qualityIndicators.score}}"><div class="full-star" ng-style="{width: \'{{document.qualityIndicators.score*10 || 0}}%\'}"></div><div class="empty-star">{{document.qualityIndicators.score || 0}}</div></div></div>' +
            '<div class="downloads">' +
            '<div class="download fulltext" ng-show="showFulltext">' +
            '<h4>{{ panistConfigDefault.labels.results["fulltext"] || "Fulltext" }}</h4>' +
            '<ul class="panist-results-item-download">' +
            //ng-repeat="fulltext in document.fulltext"
            '<li class="panist-results-item-dl fulltext" >' +
            '<a ng-show="showPDF" ng-href="{{ document.fulltext[0].uri | sidize | proxify:panistConfigDefault.proxyApi }}" class="panist-results-item-dl-{{ document.fulltext[0].extension }}" title="Télécharger le fichier {{ document.fulltext[0].extension | uppercase }}" target="_blank">{{ document.fulltext[0].extension | uppercase }}</a>' +
            '<a ng-show="showZIP" ng-href="{{ document.fulltext[1].uri | sidize | proxify:panistConfigDefault.proxyApi }}" class="panist-results-item-dl-{{ document.fulltext[1].extension }}" title="Télécharger le fichier {{ document.fulltext[1].extension | uppercase }}" target="_blank">{{ document.fulltext[1].extension | uppercase }}</a>' +
            '</li>' +
            '</ul>' +
            '</div>' +
            '<div class="download metadata" ng-show="showMetadonnee">' +
            '<h4>{{ (panistConfigDefault.labels.results["metadata"] || "Metadata") }}</h4>' +
            '<ul class="panist-results-item-download metadata">' +
            '<li class="panist-results-item-dl" >' +
            //ng-repeat="metadata in document.metadata"
            '<a ng-show="showXML" ng-href="{{ document.metadata[0].uri | sidize | proxify:panistConfigDefault.proxyApi }}" class="panist-results-item-dl-{{ document.metadata[0].extension }}" title="Télécharger le fichier {{ document.metadata[0].extension | uppercase }}" target="_blank">{{ document.metadata[0].extension | uppercase }}</a>' +
            '<a ng-show="showMODS" ng-href="{{ document.metadata[1].uri | sidize | proxify:panistConfigDefault.proxyApi }}" class="panist-results-item-dl-{{ document.metadata[1].extension }}" title="Télécharger le fichier {{ document.metadata[1].extension | uppercase }}" target="_blank">{{ document.metadata[1].extension | uppercase }}</a>' +
            '<a ng-show="showJSON" ng-href="{{ document.metadata[2].uri | sidize | proxify:panistConfigDefault.proxyApi }}" class="panist-results-item-dl-{{ document.metadata[2].extension }}" title="Télécharger le fichier {{ document.metadata[2].extension | uppercase }}" target="_blank">{{ document.metadata[2].extension | uppercase }}</a>' +
            '</li>' +
            '</ul>' +
            '</div>' +
            '<div class="download enrichment" ng-if="document.enrichments">' +
            '<h4>{{ (panistConfigDefault.labels.results["enrichment"] || "Enrichissements") }}</h4>' +
            '<ul class="panist-results-item-download enrichment">' +
            '<li class="panist-results-item-dl" ng-repeat="(name, enrichment) in document.enrichments">' +
            '<a ng-href="{{ enrichment[0].uri | sidize | proxify:panistConfigDefault.proxyApi }}" class="panist-results-item-dl-{{ enrichment[0].extension }}" title="Télécharger le fichier {{ name }}" target="_blank">XML</a>' +
            '</li>' +
            '</ul>' +
            '</div>' +
            '</div>' +
            '<div class="panist-results-item-bottom"></div>' +
            '<hr style="border-top-color: black;"/>' +
            '</li>' +
            '</ol>' +
            '<div class="panist-results-pagination" ng-if="panistConfigDefault.showPaginationBot">' +
            //'<a href="#" ng-click="selectPage(firstPageURI.id)" ng-if="pageCourante !== firstPageURI.id"> {{firstPageURI.id}} </a>'+
            '<a href="#panist-widget-search" class="panist-results-pagination-prec" title="Page précédente" ng-click="selectPage(pageCourante-1)" ng-if="pageCourante !== firstPageURI.id"> < </a>' +
            '<ul class="panist-results-pagination-plist">' +
            '<li ng-repeat="page in pages" >' +
            '<a href="#panist-widget-search" ng-click="selectPage(page.id)" ng-if="pageCourante !== page.id ">{{page.id}}</a>' +
            '<span class="panist-results-pagination-page-selected" ng-if="pageCourante === page.id">{{page.id}}</span>' +
            '</li>' +
            '</ul>' +
            '<a href="#panist-widget-search" class="panist-results-pagination-next" title="Page suivante" ng-click="selectPage(pageCourante+1)" ng-if="pageCourante !== lastPageURI.id"> > </a>' +
            //'<a href="#" ng-click="selectPage(lastPageURI.id)" ng-if="pageCourante !== lastPageURI.id"> {{lastPageURI.id}} </a>'+
            '</div>' +
            '</div>'
    };
});