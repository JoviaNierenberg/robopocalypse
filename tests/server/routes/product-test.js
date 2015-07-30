var mongoose = require('mongoose');
require('../../../server/db/models');
var Product = mongoose.model('Product');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');
var agent = supertest.agent(app)


describe('product route', function () {

	beforeEach('Establish DB connection', function (done) {
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});

	afterEach('Clear test database', function (done) {
		clearDB(done);
	});


	describe('/api/products', function () {

		describe('products', function () {

			var product

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
					done();
				});

			});


			it('GET all', function (done) {
				agent
				.get('/api/products')
				.expect(200)
				.end(function (err, res) {
					if (err) return done(err);
					expect(res.body).to.be.instanceof(Array);
					expect(res.body).to.have.length(2);
					done();
				});
			});

			

			it('POST one', function (done) {
				agent
				.post('/api/products')
				.send({
					title: 'Robot3',
					description: 'useless',
					price: 10,
					inventory: 10
				})
				.expect(201)
				.end(function (err, res) {
					if (err) return done(err);
					expect(res.body.title).to.equal('Robot3');
					done();
				});
			});
			
			it('GET one', function (done) {
				agent
				.get('/api/products/' + product[0]._id)
				.expect(200)
				.end(function (err, res) {
					if (err) return done(err);
					expect(res.body.title).to.equal(product[0].title);
					done();
				});
			});

			it('GET one that doesn\'t exist', function (done) {
				agent
				.get('/api/products/123abcnotamongoid')
				.expect(404)
				.end(done);
			});
			
			it('PUT one', function (done) {
				agent
				.put('/api/products/' + product[0]._id)
				.send({
					title: 'Mr. Roboto'
				})
				.expect(200)
				.end(function (err, res) {
					if (err) return done(err);
					expect(res.body.title).to.equal('Mr. Roboto');
					done();
				});
			});

			it('PUT one that doesn\'t exist', function (done) {
				agent
				.put('/api/products/123abcnotamongoid')
				.send({title: 'Attempt To Update Book Title'})
				.expect(404)
				.end(done);
			});
			
			it('DELETE one', function (done) {
				agent
				.delete('/api/products/' + product[0]._id)
				.expect(204)
				.end(function (err, res) {
					if (err) return done(err);
					Product.findById(product[0]._id, function (err, b) {
						if (err) return done(err);
						expect(b).to.be.null;
						done();
					});
				});
			});

			it('DELETE one that doesn\'t exist', function (done) {
				agent
				.delete('/api/products/123abcnotamongoid')
				.expect(404)
				.end(done);
			});


		});

	});

});