app.directive('panistSelect2', function () {
    return {
        template:'' +
        '<div id="panist-widget-select2" ng-controller="Panistselect2Ctrl" >' +
        '<ui-select ng-model="selected.value" ng-change="update()" >' +
        '<ui-select-match placeholder="Choisir un établissement">' +
        '<span ng-bind="$select.selected.text"></span>' +
        '</ui-select-match>' +
        '<ui-select-choices repeat="item in (itemArray | filter: $select.search) track by item.id" >' +
        '<span ng-bind="item.text" ></span>'+
        '</ui-select-choices>'+
        '</ui-select>'+
        '</div><br>'
    };
});