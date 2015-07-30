/*
Admin can
- create a new category
- delete users
- update orders tatus
- edit products
- add new products
*/

app.config(function($stateProvider) {
    // admin dashboard shows product listings
    $stateProvider.state('adminDashboard', {
        url: '/admin',
        templateUrl: 'js/admin/admin.html',
        controller: 'AdminCtrl',
        data: {
            isAdmin: true,
            authenticate: true
        }
    });

    // shows default view of product listings
    app.controller('AdminCtrl', function($scope, Products, $stateParams) {
        Products.getOne($stateParams.id).then(function(product) {
          $scope.singleProduct = product;
        });
        // Users.getOne();
    });

    // // controller so admin can delete user
    // app.controller('AdminDeleteUser', function($scope, $state, Users) {
    //     $scope.deleteUser = function(id) {
    //         Users.deleteUser(id);
    //     };
    // });

    // // controller so admin can edit product
    // app.controller('AdminEditProduct', function($scope, $state, Products) {
    //     var id = Products.getProductID();
    //     Products.getOne(id).then(function(response) {
    //         $scope.editListingForm = response;
    //     });
    // });

    // // controller so admin can delete product
    // app.controller('AdminDeleteProduct', function($scope, $state, Products) {
    //     $scope.deleteProduct = function(id) {
    //         Products.deleteProduct(id);
    //     };
    // });
    // // controller so admin can create categories
    // app.controller('AdminCreateCategoryCtrl', function($scope, Categories) {
    //     $scope.newCategory = function() {
    //         Categories.createCategory($scope.categoryForm).then(function(response) {
    //             console.log("New category created: ", response);
    //         });
    //     };
    // });
});

// controller so admin can edit orders
// app.controller('AdminEditOrdersCtrl', function($scope, $state, Orders) {});


// state where admin can edit orders, NOT delete them
// $stateProvider.state('adminEditOrders', {
//     url: '/admin/edit',
//     templateUrl: 'js/admin/edit.html',
//     controller: 'AdminEditOrdersCtrl',
//     data: {
//         isAdmin: true,
//         authenticate: true
//     }
// });
// state where admin can create a category
//     $stateProvider.state('adminCreateCategory', {
//         url: '/admin/createCategory',
//         templateUrl: '/js/admin/createCategory.html',
//         controller: 'AdminCreateCategoryCtrl',
//         data: {
//             isAdmin: true,
//             authenticate: true
//         }
//     });
//     // state where admin can delete a user
//     $stateProvider.state('adminDeleteUser', {
//         url: '/admin/deleteUser',
//         templateUrl: '/js/admin/deleteUser.html',
//         controller: 'AdminDeleteUser',
//         data: {
//             isAdmin: true,
//             authenticate: true
//         }
//     });
//     // state where admin can edit product listings
//     $stateProvider.state('adminEditProduct', {
//         url: '/admin/editProduct',
//         templateUrl: '/js/admin/editProduct.html',
//         controller: 'AdminEditProduct',
//         data: {
//             isAdmin: true,
//             authenticate: true
//         }
//     });
// });
