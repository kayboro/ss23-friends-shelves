const express = require('express');
const router = express.Router();
const passport = require('passport');
const users = require('../controllers/users');
const catchAsync = require('../utils/catchAsync');
const { storeReturnTo, isLoggedIn } = require('../middleware');


router.route('/register')
    .post(catchAsync(users.register));

router.route('/login')
    .post(storeReturnTo, passport.authenticate('local', {
        failureFlash: true,
        // failureRedirect: '/login'
    }), catchAsync(users.login));

router.get('/myRequests',
    // isLoggedIn,
    catchAsync(users.myBorrowingRequestLog));

router.get('/logout', users.logout);

module.exports = router;