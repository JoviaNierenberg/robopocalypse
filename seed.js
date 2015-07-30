/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var mongoose = require("mongoose");
var Promise = require("bluebird");
var chalk = require("chalk");
var connectToDb = require("./server/db");
var User = Promise.promisifyAll(mongoose.model("User"));
var Product = Promise.promisifyAll(mongoose.model("Product"));
var Review = Promise.promisifyAll(mongoose.model("Review"));

var seedUsers = function () {
    var users = require("./seeds/user");
    return User.createAsync(users);
};

var seedProducts = function () {
    var products = require("./seeds/product");
    return Product.createAsync(products);
}

var seedReviews = function () {
    var reviews, users, products;
    reviews = require("./seeds/review");
    return User.find().exec().then(function(people){
        users = people;
        return Product.find().exec();
    }).then(function(stuff){
        products = stuff;
        reviews.forEach(function(review){
            review.user = users[1];
            review.product = products[1];
        })
        return reviews;
    }).then(function(reviews){
        return Review.createAsync(reviews);
    })
    // return Review.createAsync(reviews);
};

connectToDb.then(function () {
    seedUsers().then(function() {
        return seedProducts();
    }).then(function() {
        return seedReviews();
    }).then(function () {
        console.log(chalk.green("Seed successful!"));
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    });
});
