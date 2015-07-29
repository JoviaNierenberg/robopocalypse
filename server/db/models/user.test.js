var mongoose = require('mongoose'),
    chai = require('chai'),
    expect = chai.expect;

mongoose.connect('mongodb://localhost/testingModels');

var User = require('./user').User;
console.log('Calling User: ', User);

describe('User Model', function() {
    beforeEach(function(done) {
        User.remove({}, done);
    });
    describe('Validations', function() {
        var user;
        beforeEach(function() {
            user = new User();
        });
        it('There should be a first and last name created.', function(done) {
            user.validate(function(err) {
                expect(err.errors).to.have.property('firstName');
                expect(err.errors).to.have.property('lastName');
                done();
            });
        });
        it('There should be an email and password created.', function(done) {
            user.validate(function(err) {
                expect(err.errors).to.have.property('email');
                expect(err.errors).to.have.property('password');
                done();
            });
        });
    });
    describe('Each user should have a unique email.', function() {
        var user1;
        beforeEach(function(done) {
            User.create({
                firstName: 'Timmy',
                lastName: 'Turner',
                email: 'timmyturner@dimmsdale.com',
                password: 'trixietang'
            }, function(err, createdUser) {
                user1 = createdUser;
                done();
            });
        });
    });
});
