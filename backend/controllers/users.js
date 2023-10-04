const User = require('../models/user');
const Book = require('../models/book');

// react version: user register - to do: cookies/session
module.exports.register = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        const dbUserentry = await User.find({ username: username });
        res.send(dbUserentry);
        req.login(registeredUser, err => {
            if (err) return next(err);
            // req.flash('success', `Welcome to FriendsShelves ${username}!`);
            // res.send(username);
        });
    } catch (e) {
        // req.flash('error', e.message);
        res.send(e.message);
    };
}

// react version:
// Esther: get session and redirect logic set up
module.exports.login = async (req, res) => {
    const { username } = req.body;
    const user = await User.find({ username: username });
    // req.flash('success', `Welcome back ${username}!`);
    // const redirectUrl = res.locals.returnTo || '/books/mine';
    // res.redirect(redirectUrl);
    res.send(user);
}

// get requestlog info 
// refactor for case of double lending of the same book: currently for all requests in the log the books are found.
// In case you borrowed the book some time in the past and have a now ongoing request you will have the book twice in the books data
// but on it you can only access the very last request you made.
// To Do: discuss what should be shown in the requestlog 
// (current idea: book covers that lead to their show page; 
// also ok would be a list with time, title/cover, bookLocation and owner(if not home/declined))
module.exports.myBorrowingRequestLog = async (req, res) => {
    const requserid = '64f09610fcc82a3f318948fc';
    // const requserid = '64f0969dfcc82a3f3189491a';
    // const requserid = '64f096b7fcc82a3f31894921';
    // Esther to Alex: comment the above 3 line3 and uncomment the following line
    // const requserid = req.user._id;
    const user = await User.findById(requserid);
    const response = await Book.find({ borrowingrequests: { $in: user.requestlog } }).populate('borrowingrequests');
    const books = response.map(({ _id, title, author, isbn, image, blurb, borrowingrequests }) => (
        {
            _id, title, author, isbn, image, blurb,
            "owner": false,
            available:
                borrowingrequests.length === 0
                    ||
                    borrowingrequests[borrowingrequests.length - 1].bookLocation === ('backHome' && 'declined')
                    ? true : false,
            dueDate:
                borrowingrequests.length === 0
                    ||
                    borrowingrequests[borrowingrequests.length - 1].bookLocation === ('backHome' && 'declined')
                    ? '' : borrowingrequests[borrowingrequests.length - 1].dueDate,
            borrowingrequests: borrowingrequests
            [
                borrowingrequests.map(({ borrower }) => (borrower))
                    .findLastIndex((borrowerId) => borrowerId.equals(requserid))
            ]
        }
    ));
    res.send(books);
};

module.exports.myWatchlist = async (req, res) => {
    const requserid = '64f09610fcc82a3f318948fc';
    // const requserid = '64f0969dfcc82a3f3189491a';
    // const requserid = '64f096b7fcc82a3f31894921';
    // Esther to Alex: comment the above 3 line3 and uncomment the following line
    // const requserid = req.user._id;
    const user = await User.findById(requserid);
    const response = await Book.find({ _id: { $in: user.watchlist } }).populate('borrowingrequests');
    const books = response.map(({ _id, title, author, isbn, image, blurb, borrowingrequests }) => (
        {
            _id, title, author, isbn, image, blurb,
            "owner": false,
            available:
                borrowingrequests.length === 0
                    ||
                    borrowingrequests[borrowingrequests.length - 1].bookLocation === ('backHome' && 'declined')
                    ? true : false,
            dueDate:
                borrowingrequests.length === 0
                    ||
                    borrowingrequests[borrowingrequests.length - 1].bookLocation === ('backHome' && 'declined')
                    ? '' : borrowingrequests[borrowingrequests.length - 1].dueDate,
            borrowingrequests: borrowingrequests
            [
                borrowingrequests.map(({ borrower }) => (borrower))
                    .findLastIndex((borrowerId) => borrowerId.equals(requserid))
            ]
        }
    ));
    res.send(books)
};



// react version:
module.exports.logout = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        // req.flash('success', 'Goodbye!');
        // res.redirect('/');
    });
    res.send('successfully logged out on the BE!');
}