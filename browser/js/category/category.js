app.config(function($stateProvider) {
    $stateProvider.state("category", {
        url: "/category/{id}",
        controller: "CategoryCtrl",
        templateUrl: "js/category/category.html",
    });
});

app.controller('CategoryCtrl', function($scope, Categories, Products) {
    $scope.tabs = [];
    Categories.getAll().then(function(categories) {
        categories.forEach(function(category) {
            Products.getAll({
                category: {
                    $all: category._id
                }
            }).then(function(products) {
                products = products.filter(function (prodEntry) {
                    if(prodEntry.inventory === 0 || prodEntry.seller){
                        return false;
                    }
                    return true;
                });
                category.content = products;
                $scope.tabs.push(category);
                $scope.loaded = true;
            });
        });
    });
});