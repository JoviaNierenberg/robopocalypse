app.factory('Cart', function ($rootScope, $http) {
    var cart = {
        items: {},
        subtotal: 0,
        totalItems: 0
    };

    var updateCart = function () {
        $http.put("/api/cart", cart).then(function (res) {
            console.log(res.data);
        });
    }

    return {

        // returns products in cart
        getCart: function () {
            return cart;
        },
        // adds a product to the cart
        addToCart: function (product) {
            if(cart.items[product.title] === undefined){
                cart.items[product.title] = {product: product, quantity: 1};
            }
            else{
                cart.items[product.title].quantity++;
            }
            cart.subtotal += product.price;
            cart.totalItems++;
            $rootScope.$emit("cartChange", cart);
            updateCart();
        },
        // removes an item from the cart
        removeFromCart: function (product) {
            if(cart.items[product.title].quantity === 1){
                delete cart.items[product.title];
            } else{
                cart.items[product.title].quantity--;
            }
            cart.subtotal -= product.price;
            cart.totalItems--;
            $rootScope.$emit("cartChange", cart);
            updateCart();
        },
        // completely resets cart to empty
        emptyCart: function () {
            cart.items = {};
            cart.subtotal = 0;
            cart.totalItems = 0;
            $rootScope.$emit("cartChange", cart);
            updateCart();
        },
        submitOrder: function () {
            cart.billing = "Test";
            $http.post("/api/orders/", cart).then(function (res) {
                console.log(res.data)
                // $state.go("confirmation");
            });
        }
    };
});
