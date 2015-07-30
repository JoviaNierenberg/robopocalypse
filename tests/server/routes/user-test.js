// // Instantiate all models
// var mongoose = require('mongoose');
// require('../../../server/db/models');
// var User = mongoose.model('User');

// var expect = require('chai').expect;

// var dbURI = 'mongodb://localhost:27017/testingDB';
// var clearDB = require('mocha-mongoose')(dbURI);

// var supertest = require('supertest');
// var app = require('../../../server/app');

// describe('/api/products', function () {

// describe('chapters', function () {

// 				var chapterBook;

// 				before(function (done) {
// 					Book.findOne({}, function (err, b) {
// 						if (err) return done(err);
// 						chapterBook = b;
// 						done();
// 					});
// 				});

// 				it('GET all', function (done) {
// 					agent
// 					.get('/api/books/' + chapterBook._id + '/chapters')
// 					.expect(200)
// 					.end(function (err, res) {
// 						if (err) return done(err);
// 						// this should be an array of *chapters* not books
// 						expect(res.body).to.be.instanceof(Array);
// 						done();
// 					});
// 				});

// 				var createdChapter;

// 				it('POST one', function (done) {
// 					// notice the addChapter method we've provided for the Book model
// 					// it is helpful here!
// 					agent
// 					.post('/api/books/' + chapterBook._id + '/chapters')
// 					.send({
// 						title: 'Chapter Made By Test',
// 						text: 'A chapter made by a test',
// 						number: 11
// 					})
// 					.expect(201)
// 					.end(function (err, res) {
// 						if (err) return done(err);
// 						expect(res.body.title).to.equal('Chapter Made By Test');
// 						createdChapter = res.body;
// 						Book.findById(chapterBook._id, function (err, b) {
// 							if (err) return done(err);
// 							expect(b.chapters).to.contain(createdChapter._id);
// 							Chapter.findById(createdChapter._id, function (err, c) {
// 								if (err) return done(err);
// 								expect(c).to.not.be.null;
// 								done();
// 							});
// 						});
// 					});
// 				});
				
// 				it('GET one', function (done) {
// 					var chapId = createdChapter._id;
// 					agent
// 					.get('/api/books/' + chapterBook._id + '/chapters/' + chapId)
// 					.expect(200)
// 					.end(function (err, res) {
// 						if (err) return done(err);
// 						expect(res.body._id).to.equal(chapId);
// 						done();
// 					});
// 				});

// 				it('GET one that doesn\'t exist', function (done) {
// 					agent
// 					.get('/api/books/' + chapterBook._id + '/chapters/123abcnotamongoid')
// 					.expect(404)
// 					.end(done);
// 				});
				
// 				it('PUT one', function (done) {
// 					var chapId = createdChapter._id;
// 					agent
// 					.put('/api/books/' + chapterBook._id + '/chapters/' + chapId)
// 					.send({
// 						title: 'Chapter Updated By Test'
// 					})
// 					.expect(200)
// 					.end(function (err, res) {
// 						if (err) return done(err);
// 						expect(res.body.title).to.equal('Chapter Updated By Test');
// 						done();
// 					});
// 				});

// 				it('PUT one that doesn\'t exist', function (done) {
// 					agent
// 					.put('/api/books/' + chapterBook._id + '/chapters/123abcnotamongoid')
// 					.send({
// 						title: 'Attempt To Update Chapter Title'
// 					})
// 					.expect(404)
// 					.end(done);
// 				});
				
// 				it('DELETE one', function (done) {
// 					// notice the removeChapter method we've provided for the Book model
// 					// it is helpful here!
// 					var chapId = createdChapter._id;
// 					agent
// 					.delete('/api/books/' + chapterBook._id + '/chapters/' + chapId)
// 					.expect(204)
// 					.end(function (err, res) {
// 						if (err) return done(err);
// 						Chapter.findById(chapId, function (err, c) {
// 							if (err) return done(err);
// 							expect(c).to.be.null;
// 							Book.findById(chapterBook._id, function (err, b) {
// 								if (err) return done(err);
// 								expect(b.chapters).to.not.contain(chapId);
// 								done();
// 							});
// 						});
// 					});
// 				});

// 				it('DELETE one that doesn\'t exist', function (done) {
// 					agent
// 					.delete('/api/books/' + chapterBook._id + '/chapters/123abcnotamongoid')
// 					.expect(404)
// 					.end(done);
// 				});

// 			});


// });
