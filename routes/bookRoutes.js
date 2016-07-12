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

    bookRouter.route('/:bookId')
    .get(function(req, res) {
        Book.findById(req.params.bookId, function(err, book) {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.json(book);
            }
        });
    });

    return bookRouter;
};

module.exports = routes;
