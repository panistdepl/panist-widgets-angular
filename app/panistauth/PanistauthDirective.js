app.directive('panistAuth', function () {
    return {
        template:'' +
        '<div id="panist-widget-auth" ng-controller="PanistauthCtrl">'+
            '<button class="panist-ezproxy-auth-btn" ng-if="!isConnected" ng-click="connect()">Se connecter<div></div></button>'+
        '</div>'
    };
});