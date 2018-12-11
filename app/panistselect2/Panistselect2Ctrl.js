app.controller('Panistselect2Ctrl', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
    //Enregistrer la valeur selectionnée dans la liste des établissements 
    $scope.update = function () {
        localStorage.setItem("idc", JSON.stringify($rootScope.selected));
    }

    $http.get('listeInstitutions.json')
        .then(function (res) {
            $rootScope.itemArray = res.data;
            $rootScope.selected = {};
            if (localStorage.getItem("idc") != undefined)
                $rootScope.selected = JSON.parse(localStorage.getItem("idc"));
        });
}]);