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

var Promise = require("bluebird");
var mongoose = Promise.promisifyAll(require("mongoose"));
var chalk = require("chalk");
var connectToDb = require("./server/db");
var User = Promise.promisifyAll(mongoose.model("User"));
var Product = Promise.promisifyAll(mongoose.model("Product"));
var Review = Promise.promisifyAll(mongoose.model("Review"));
var Category = Promise.promisifyAll(mongoose.model("Category"));

var seedUsers = function () {
    var users = require("./seeds/user");
    return User.createAsync(users);
};

var seedCategories = function () {
    var categories = require("./seeds/category");
    return Category.createAsync(categories);
};

var seedProducts = function () {
    var products = require("./seeds/product");

    return Category.find().exec().then(function(categories){
        products.forEach(function(product){
            product.category = categories[Math.floor(Math.random() * categories.length)];
        })
        return Product.createAsync(products);
    });
};

var dropDatabase = function () {
    return new Promise(function(resolve, reject) {
        mongoose.connection.db.dropDatabase(function(err, result) {
            if (err) reject(err);
            else {
                resolve(result);
            }
        });
    });
};

var seedReviews = function () {
    var reviews, users;
    reviews = require("./seeds/review");
    return User.find().exec().then(function(people){
        users = people;
        return Product.find().exec();
    }).then(function(products){
        reviews.forEach(function(review){
            review.user = users[1];
            review.product = products[1];
        })
        return Review.createAsync(reviews);
    });
};

connectToDb.then(function () {
    dropDatabase().then(function() {
        return seedUsers();
    }).then(function() {
        return seedCategories();
    }).then(function() {
        return seedProducts();
    }).then(function() {
        return seedReviews();
    }).then(function () {
        console.log(chalk.green("Seed successful!"));
        process.kill(0);
    }).catch(function(err) {
        console.error(err);
        process.kill(1);
    });
});
