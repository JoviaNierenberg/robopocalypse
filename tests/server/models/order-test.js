var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var should = require('chai').should;
var assert = require('chai').assert;
var mongoose = require('mongoose');

require('../../../server/db/models');

var Order = mongoose.model('Order');
var User = mongoose.model('User');
var Product = mongoose.model('Product')

describe('Order model', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });


    it('should exist', function () {
        expect(Order).to.be.a('function');
    });


    describe('on creation', function () {

        var user, product

        beforeEach(function (done) {

            Product.create([{
                title: 'Robot',
                description: 'useless',
                price: 10,
                inventory: 10
            },{
                title: 'Robot2',
                description: 'useless',
                price: 10,
                inventory: 10
            }], function (err, a) {
                if (err) return done(err);
                product = a;
            })
            .then(function(){
                User.create({
                    email: 'abc@123.com',
                    password: 'abc123',
                    name: {
                        first: 'abc',
                        last: '123'
                    }
                }, function(err, data){
                    if(err) return done(err)
                    user = data
                    done()
                })

            })


        });

        var itemize = function (items) {
            var dbItems = {};
            for(var item in items) {
                dbItems[items[item].product._id] = items[item].quantity;
            }
            return dbItems;
        }


        it('saves a product', function(done){
            var items = {}
            var item1 = {}
            var item2 = {}
            item1.product = product[0]
            item2.product = product[1]
            item1.quantity = 1
            item2.quantity = 10
            items[product[0].title] = item1
            items[product[1].title] = item2
            var obj = {buyer: user._id, billing:'abc st. 123,abc 123123', items: items, price: 100};
            Order.create(obj, function(err, order){
                expect(order.buyer).to.equal(user._id);
                expect(order.billing).to.equal('abc st. 123,abc 123123');
                expect(order.items).to.equal(itemize(items));
                expect(order.price).to.equal(100);
                
            });
            done();
        });

        it('should require a user._id', function (done) {
            var items = {}
            var item1 = {}
            var item2 = {}
            item1.product = product[0]
            item2.product = product[1]
            item1.quantity = 1
            item2.quantity = 10
            items[product[0].title] = item1
            items[product[1].title] = item2
            var order = new Order({buyer: '123', billing:'abc st. 123,abc 123123', items: items, price: 100});
            order.save(function(err, savedOrder) {
                expect( err.message ).to.equal( 'Order validation failed' );
                done();
            });
            
        });

        it("should only take in items styled in the form of the shopping cart", function (done) {
            var order = new Order({buyer: user._id, billing:'abc st. 123,abc 123123', items: {robot: 1}, price: 100});
            order.save(function(err, savedOrder) {
                expect( err.message ).to.equal( 'Order validation failed' );
                done();
            });
            
        });

        it("should get items back in a shopping cart format", function (done) {
            var items = {}
            var item1 = {}
            var item2 = {}
            item1.product = product[0]
            item2.product = product[1]
            item1.quantity = 1
            item2.quantity = 10
            items[product[0].title] = item1
            items[product[1].title] = item2
            var order = new Order({buyer: user._id, billing:'abc st. 123,abc 123123', items: items, price: 100});
            order.save(function(err, savedOrder) {
                expect( savedOrder.items ).to.equal( items );
                
            });
            done()
            
        });

        it('should require price', function (done) {
            var items = {}
            var item1 = {}
            var item2 = {}
            item1.product = product[0]
            item2.product = product[1]
            item1.quantity = 1
            item2.quantity = 10
            items[product[0].title] = item1
            items[product[1].title] = item2
            var order = new Order({buyer: user._id, billing:'abc st. 123,abc 123123', items: items});
            order.save(function(err, savedProduct) {
                expect( err.message ).to.equal( 'Order validation failed' );
                done();
            });
            
        });



    });

});
