var should = require('should');
var sinon = require('sinon');

describe('Book controller test', function() {
    describe('Post tests', function() {
        it('should not allow an empty title post', function() {
            var Book = function(book) {
                this.save = function() {

                };
            }

            var req = {
                body: {
                    author: 'Jon'
                }  
            }

            var res = {
                status: sinon.spy(),
                send: sinon.spy()
            }

            var bookController = require('../controllers/bookController')(Book);
            bookController.post(req, res);

            res.status.calledWith(400).should.equal(true, 'Bad Status ' + res.status.args[0][0]);
            res.send.calledWith('Title is required').should.equal(true);
        });
    });
});