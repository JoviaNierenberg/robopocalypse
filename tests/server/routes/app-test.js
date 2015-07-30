
// describe('app', function () {
// 	it('serves up static files (from the static folder in the public folder) on /files route', function (done) {
// 		agent
// 		.get('/files/index.html')
// 		.expect(200)
// 		.end(function (err, res) {
// 			if (err) return done(err);
// 			fs.readFile(__dirname + '/public/static/index.html', function (err, contents) {
// 				if (err) return done(err);
// 				expect(res.text).to.equal(contents.toString());
// 				done();
// 			});
// 		});
// 	});

// 	it('handles internal server errors', function (done) {
// 		// in an actual application, this route wouldn't exist
// 		// it's here just to test how you handle errors in an express app
// 		agent
// 		.get('/broken')
// 		.expect(500, done);
// 	});

// 	it('handles custom errors', function (done) {
// 		// in an actual application, this route wouldn't exist
// 		// it's here just to test how you handle errors in an express app
// 		agent
// 		.get('/forbidden')
// 		.expect(403, done);
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