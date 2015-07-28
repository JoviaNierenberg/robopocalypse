app.factory('Cart', function() {
    var cart = {
        items: {},
        totalPrice: 0,
        totalItems: 0
    };

    return {

        // returns products in cart
        getCart: function() {
            return cart
        },
        // adds a product to the cart
        addToCart: function(product) {
            if(cart.items[product.title] === undefined){
                cart.items[product.title] = 1
            }
            else{
                cart.items[product.title]++
            }
            cart.totalPrice += product.price
            cart.totalItems++
            return cart
        },
        // removes an item from the cart
        removeFromCart: function(product) {
            if(cart.items[product.title] === 1){
                delete cart.items[product.title]
            } else{
                cart.items--
            }
            cart.totalPrice -= product.price
            cart.totalItems--
            return cart
        },
        // gets total price of all items in cart
        // getTotalPrice: function() {

        // },
        // updates number of products in cart
        // getTotalItems: function() {
        //     var count = 0;
        //     for(var key in cart.items){
        //         count += cart.items[key]
        //     }
        //     return count
        // },
        // completely resets cart to empty
        emptyCart: function() {
            cart.items = {}
            cart.totalPrice = 0
            cart.totalItems = 0
            return cart
        },
    };
});
