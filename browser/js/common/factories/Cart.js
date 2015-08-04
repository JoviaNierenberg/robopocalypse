app.factory('Cart', function ($rootScope, $http) {
    var cart = {
        items: {},
        subtotal: 0,
        totalItems: 0
    };

    var updateCart = function () {
        $http.put("/api/cart", cart);
    };

    return {

        // returns products in cart
        getCart: function () {
            return cart;
        },
        setCart: function (initCart) {
            cart = initCart;
            $rootScope.$emit("cartChange", cart);
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
        // sets the quantity of an item
        setQuantity: function (item, quantity) {
            var updateItem = cart.items[item.product.title]
            // "remove" item from cart totals
            cart.subtotal -= updateItem.product.price * updateItem.quantity;
            cart.totalItems -= updateItem.quantity;
            // "read" item to cart totals
            cart.subtotal += updateItem.product.price * quantity;
            cart.totalItems += quantity;
            updateItem.quantity = quantity;
            $rootScope.$emit("cartChange", cart);
            updateCart();
        },
        // removes an item from the cart
        removeFromCart: function (item) {
            cart.subtotal -= item.product.price * item.quantity;
            cart.totalItems -= item.quantity;
            //ignore error below, this variable is a reference to an entry in the cart
            delete cart.items[item.product.title];
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
        submitOrder: function (order, userId) {
            $http.post("/api/orders/", order).then(function (res) {
                alert('Your order has been created. A confirmation has been sent. If you are a user, you can view it in your profile.')
                $state.go("home");
            });
        }
    };
});
