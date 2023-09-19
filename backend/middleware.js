const ExpressError = require('./utils/ExpressError');
const { bookSchema, reviewSchema } = require('./schemas');
const Book = require('./models/book');
const Review = require('./models/review');

// Esther: revisit when session is working
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        // req.session.returnTo = req.originalUrl;
        // req.flash('error', 'You must be signed in first');
        // return res.redirect('/login');
        return res.send('sign in please');
    };
    // console.log('isLoggedIn just ran');
    next();
};

// Esther: useful when redirecting with session is working
module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
};

// validate the incoming data for book creation or updating with the book Joi Schema
module.exports.validateBook = (req, res, next) => {
    const { error } = bookSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
};

// Esther: revisit when session is working
module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book.owner.equals(req.user._id)) {
        // req.flash('error', 'You do not have permission to do that!');
        // return res.redirect(`/books/${id}`)
        return res.send('sign in as book owner please');
    };
    // console.log('isOwner just ran');
    next();
};

// Esther: revisit when session is working and we want to incorporate reviews
module.exports.isReviewWriter = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.writer.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/campgrounds/${id}`)
    };
    next();
};

// Esther: revisit when session is working and we want to incorporate reviews
module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
};