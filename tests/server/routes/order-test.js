var mongoose = require('mongoose');
require('../../../server/db/models');
var Order = mongoose.model('Order');
var User = mongoose.model('User');
var Product = mongoose.model('Product')

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');
var agent = supertest.agent(app)


describe('order route', function () {

	beforeEach('Establish DB connection', function (done) {
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});

	afterEach('Clear test database', function (done) {
		clearDB(done);
	});


	describe('/api/orders', function () {

		describe('orders', function () {

			var order, user, product

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
					})
					.then(function(){
						var items = {}
						var item1 = {}
						var item2 = {}
						item1.product = product[0]
						item2.product = product[1]
						item1.quantity = 1
						item2.quantity = 10
						items[product[0].title] = item1
						items[product[1].title] = item2
						Order.create({
							buyer: user._id,
							billing: 'abc st. 123, ab 123123',
							items: items,
							price: 100
						}, function(err, data){
							if(err) return done(err)
							order = data
							done()
						})
					})
				})


			});


			it('GET all', function (done) {
				agent
				.get('/api/orders')
				.expect(200)
				.end(function (err, res) {
					if (err) return done(err);
					expect(res.body).to.be.instanceof(Array);
					expect(res.body).to.have.length(1);
					done();
				});
			});

			

			it('POST one', function (done) {
				var items = {}
				var item1 = {}
				var item2 = {}
				item1.product = product[0]
				item2.product = product[1]
				item1.quantity = 20
				item2.quantity = 100
				items[product[0].title] = item1
				items[product[1].title] = item2
				agent
				.post('/login')
				.send({email: 'abc@123.com',
					password: 'abc123',
				})
				.end(function(){
					console.log('logged in')
					agent
					.post('/api/orders')
					.send({
						billing: 'abc st. 123, ab 123123',
						items: items,
						price: 10000
					})
					.end(function (err, res) {
						if (err) return done(err);
						expect(res.body.price).to.equal(10000);
						done();
					});
				})
					
			});

			it('GET with query string filter for id', function (done) {
				agent
				// remember that in query strings %20 means a single whitespace character
				.get('/api/orders?buyer=' + user._id)
				.expect(200)
				.end(function (err, res) {
					if (err) return done(err);
					expect(res.body).to.be.instanceof(Array);
					expect(res.body).to.have.length(1);
					done();
				});
			});
			
			it('GET Single Order', function (done) {
				agent
				.get('/api/orders/' + order._id)
				.expect(200)
				.end(function (err, res) {
					if (err) return done(err);
					expect(res.body.price).to.equal(order.price);
					done();
				});
			});

			it('GET one that doesn\'t exist', function (done) {
				agent
				.get('/api/orders/123abcnotamongoid')
				.expect(404)
				.end(done);
			});
			
			// it('PUT one', function (done) {
			// 	agent
			// 	.put('/api/products/' + product[0]._id)
			// 	.send({
			// 		title: 'Mr. Roboto'
			// 	})
			// 	.expect(200)
			// 	.end(function (err, res) {
			// 		if (err) return done(err);
			// 		expect(res.body.title).to.equal('Mr. Roboto');
			// 		done();
			// 	});
			// });

			// it('PUT one that doesn\'t exist', function (done) {
			// 	agent
			// 	.put('/api/books/123abcnotamongoid')
			// 	.send({title: 'Attempt To Update Book Title'})
			// 	.expect(404)
			// 	.end(done);
			// });
			
			// it('DELETE one', function (done) {
			// 	agent
			// 	.delete('/api/products/' + product[0]._id)
			// 	.expect(204)
			// 	.end(function (err, res) {
			// 		if (err) return done(err);
			// 		Product.findById(product[0]._id, function (err, b) {
			// 			if (err) return done(err);
			// 			expect(b).to.be.null;
			// 			done();
			// 		});
			// 	});
			// });

			// it('DELETE one that doesn\'t exist', function (done) {
			// 	agent
			// 	.delete('/api/products/123abcnotamongoid')
			// 	.expect(404)
			// 	.end(done);
			// });


		});

	});

});