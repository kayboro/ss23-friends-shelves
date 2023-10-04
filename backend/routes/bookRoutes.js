const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const books = require('../controllers/books');
const { isLoggedIn, validateBook, isOwner, bookIsInDB, isNotOwner } = require('../middleware');



router.route('/')
    .get(
        isLoggedIn,
        catchAsync(books.index))
    .post(
        isLoggedIn,
        validateBook,
        catchAsync(books.createBook));

router.get('/mine',
    isLoggedIn,
    catchAsync(books.myIndex));

router.route('/:id')
    .get(
        // isLoggedIn,
        bookIsInDB,
        catchAsync(books.showBook))
    .put(
        isLoggedIn,
        bookIsInDB,
        catchAsync(isOwner),
        validateBook,
        catchAsync(books.updateBook))
    .delete(
        // isLoggedIn,
        bookIsInDB,
        // catchAsync(isOwner),
        catchAsync(books.deleteBook));

router.route('/:id/watchlist')
    .get(
        // isLoggedIn,
        bookIsInDB,
        // isNotOwner,
        catchAsync(books.addBookToWatchlist))
    .delete(
        // isLoggedIn,
        bookIsInDB,
        // isNotOwner,
        catchAsync(books.removeBookFromWatchlist));

module.exports = router;