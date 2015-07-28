var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var should = require('chai').should;
var assert = require('chai').assert;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var Product = mongoose.model('Product');

describe('Product model', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Product).to.be.a('function');
    });


    describe('on creation', function () {

        var createProduct = function (obj) {
            return Product.create(obj);
        };

        it('saves a product', function(done){
            var obj = {title:'Robot', description:'useless', price: 20, inventory: 10};
            createProduct(obj).then(function(product){
                expect(product.title).to.equal('Robot');
                expect(product.description).to.equal('useless');
                expect(product.price).to.equal(20);
                expect(product.inventory).to.equal(10);
                done();
            });
        });

        it('should require title', function (done) {
            var product = new Product({description:'useless', price: 20, inventory: 10});
            product.save(function(err, savedProduct) {
                expect( err.message ).to.equal( 'Product validation failed' );
                done();
            });
            
        });

        it('should require description', function (done) {
            var product = new Product({title:'useless', price: 20, inventory: 10});
            product.save(function(err, savedProduct) {
                expect( err.message ).to.equal( 'Product validation failed' );
                done();
            });
            
        });

        it('should require price', function (done) {
            var product = new Product({title:'useless', description: '20', inventory: 10});
            product.save(function(err, savedProduct) {
                expect( err.message ).to.equal( 'Product validation failed' );
                done();
            });
            
        });

    });

    describe("virtuals", function () {
        var createProduct = function (obj) {
            return Product.create(obj);
        };

        it("should have a trimmed description that is limited to 200 characters", function (done) {
            var obj = {title:'Robot', description:'useless', price: 20, inventory: 10};

            createProduct(obj).then(function (product) {
                expect(product.shortDesc).to.have.length.below(200);
                done();
            });
        });

        // it("should have a virtual that has the average rating of all it's reviews", function(done){
            
        // })

    });

    // describe("methods", function () {
    //     var createProduct = function (obj) {
    //         return Product.create(obj);
    //     };

    //     it("should have a method to get all reviews", function (done) {
    //         var obj = {title:'Robot', description:'useless', price: 20, inventory: 10};

    //         createProduct(obj).then(function (product) {
    //             expect(product.shortDesc).to.have.length.below(200);
    //             done();
    //         });
    //     });

    // });

});
