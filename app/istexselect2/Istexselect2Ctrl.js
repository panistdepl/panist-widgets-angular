app.controller('Istexselect2Ctrl', ['$scope', '$rootScope','$http', function ($scope, $rootScope,$http) {

    $scope.update = function()
    {
        localStorage.setItem("idc",JSON.stringify($rootScope.selected));   
    }
    //CORS !!
    //https://addons.panist.fr/listeInstitutions.json
    $http.get('https://addons.panist.fr/listeInstitutions.json')
    .then(function(res){
       $rootScope.itemArray = res.data;                
       $rootScope.selected = {};
       if (localStorage.getItem("idc") != undefined)             
       $rootScope.selected = JSON.parse(localStorage.getItem("idc"));
    });


}]);