var mongoose = require('mongoose');
require('../../../server/db/models');
var User = mongoose.model('User');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');
var agent = supertest.agent(app)


describe('users route', function () {

	beforeEach('Establish DB connection', function (done) {
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});

	afterEach('Clear test database', function (done) {
		clearDB(done);
	});


	describe('/api/users', function () {

		describe('users', function () {

			var user

			beforeEach(function (done) {
				User.create({
					email: 'abc@123.com',
					password: 'abc123',
					name: {
						first: 'abc',
						last: '123'
					},
					isAdmin:true				
				}, function(err, data){
					if(err) return done(err)
					user = data
				})

			});


			it('GET All', function (done) {
				agent
				.post('/login')
				.send({email: 'abc@123.com',
					password: 'abc123',
				})
				.end(function(){
					console.log('logged in')
					agent
					.get('/api/users')
					.end(function (err, res) {
						if (err) return done(err);
						expect(res.body[0].email).to.equal('abc@123.com');
						done();
					});
				})
			});

			

			// it('POST one', function (done) {
			// 	agent
			// 	.post('/api/products')
			// 	.send({
			// 		title: 'Robot3',
			// 		description: 'useless',
			// 		price: 10,
			// 		inventory: 10
			// 	})
			// 	.expect(201)
			// 	.end(function (err, res) {
			// 		if (err) return done(err);
			// 		expect(res.body.title).to.equal('Robot3');
			// 		done();
			// 	});
			// });
			
			// it('GET one', function (done) {
			// 	agent
			// 	.get('/api/products/' + product[0]._id)
			// 	.expect(200)
			// 	.end(function (err, res) {
			// 		if (err) return done(err);
			// 		expect(res.body.title).to.equal(product[0].title);
			// 		done();
			// 	});
			// });

			// it('GET one that doesn\'t exist', function (done) {
			// 	agent
			// 	.get('/api/products/123abcnotamongoid')
			// 	.expect(404)
			// 	.end(done);
			// });
			
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
			// 	.put('/api/products/123abcnotamongoid')
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