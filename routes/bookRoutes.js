var express = require('express');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/bookAPI');
var Book = require('../models/bookModel');

var routes = function() {
    var bookRouter = express.Router();

    bookRouter.route('/')
    .post(function(req, res) {
        var book = new Book(req.body);

        book.save();
        res.status(201).send(book);
    })
    .get(function(req, res) {
        var query = {};

        if (req.query.genre) {
            query.genre = req.query.genre;
        }

        Book.find(query, function(err, books) {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.json(books);
            }
        });
    });

    bookRouter.use('/:bookId', function(req, res, next) {
        Book.findById(req.params.bookId, function(err, book) {
            if (err) {
                res.status(500).send(err);
            }
            else {
                if (book) {
                    req.book = book;
                    next();
                }
                else {
                    res.status(404).send('no book found');
                }
            }
        });
    });

    bookRouter.route('/:bookId')
    .get(function(req, res) {
        res.send(req.book);
    })
    .put(function(req, res) {
        Book.findById(req.params.bookId, function(err, book) {
            req.book.title = req.body.title;
            req.book.author = req.body.author;
            req.book.genre = req.body.genre;
            req.book.read = req.body.read;

            req.book.save();
            res.json(req.book);
        });
    });

    return bookRouter;
};

module.exports = routes;
