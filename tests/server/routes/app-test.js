
var mongoose = require('mongoose');
require('../../../server/db/models');
var Product = mongoose.model('Product');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');
var agent = supertest.agent(app)


// describe('app', function () {

// 	it('handles internal server errors', function (done) {
// 		// in an actual application, this route wouldn't exist
// 		// it's here just to test how you handle errors in an express app
// 		agent
// 		.post('/api/products')
// 		.body({title: 'something'})
// 		.expect(500, done);
// 	});

// 	describe('/numVisits', function () {

// 		it('counts a client\'s visits to it', function (done) {
// 			// should originally send back zero
// 			// but should increment, thus returning one the next time around
// 			var clientA = agent;
// 			clientA
// 			.get('/api/numVisits')
// 			.expect(200)
// 			.end(function (err, res) {
// 				if (err) return done(err);
// 				expect(res.body.number).to.equal(0);
// 				clientA
// 				.get('/api/numVisits')
// 				.expect(200)
// 				.end(function (err, res) {
// 					if (err) return done(err);
// 					expect(res.body.number).to.equal(1);
// 					done();
// 				});
// 			});
// 		});


// 		it('distinguises between clients', function (done) {
// 			// should be zero again for this client!
// 			var clientB = supertest.agent(app);
// 			clientB
// 			.get('/api/numVisits')
// 			.expect(200)
// 			.end(function (err, res) {
// 				if (err) return done(err);
// 				expect(res.body.number).to.equal(0);
// 				done();
// 			});

// 		});

// 	});

// });