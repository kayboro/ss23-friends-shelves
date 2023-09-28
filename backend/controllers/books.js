// const { not } = require('joi');
const Book = require('../models/book');

// react version of: send all books that don't belong to the user to FE
module.exports.index = async (req, res) => {
    const currentUser = req.user._id;
    const response = await Book.find({ owner: { $ne: currentUser } }).sort({ title: 1 });
    const books = response.map(({ _id, title, author, isbn, image, blurb }) => (
        // For initial display _id + imgage, for hoverinfo author + blurb needed, for search title + isbn + author needed
        // for buttons (later not needed on index), owner needed
        { _id, title, author, isbn, image, blurb, "owner": false }
    ));
    res.send(books);
    // Future version with decision making based on more vaiables:
    // entry for did user already read this, is this on watchlist, gift/lending/permanentLend, available/dueDate
    // { 
    // _id,
    //  title,
    //  author,
    //  isbn,
    //  image,
    //  blurb,
    //  "owner": false,
    //  "previouslyRead": true,
    //  "watchlist": false,
    //  "gift": false,
    //  "lending": true,
    //  "permanentLend": false,
    //  "availabe": false,
    //  "dueDate": 2023-12-15 
    //  }
};

// react version of: send all books of a user to FE
module.exports.myIndex = async (req, res) => {
    const currentUser = req.user._id;
    const response = await Book.find({ owner: currentUser }).sort({ title: 1 });
    const books = response.map(({ _id, title, author, isbn, image, blurb }) => (
        { _id, title, author, isbn, image, blurb, "owner": true }
    ));
    res.send(books);
};


// react version of: post request handeling for a new book 
module.exports.createBook = async (req, res, next) => {
    const book = new Book(req.body.book);
    book.owner = req.user._id;
    await book.save();
    // req.flash('success', 'Successfully created a new book!');
    res.send(book)
};

// Esther: should be usefull when the show page like with the BE version is up
module.exports.showBook = async (req, res) => {
    const book = await Book.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'writer'
        },
    }).populate('owner');
    if (!book) {
        req.flash('error', 'Cannot find that book!');
        // return res.redirect('/books');
    };
    // res.render('books/show', { book });
};


// react version of: put request handeling for updating a book 
module.exports.updateBook = async (req, res) => {
    const { id } = req.params;
    await Book.findByIdAndUpdate(id, { ...req.body.book });
    const book = await Book.findOne({ _id: id }).populate('owner');
    // req.flash('success', 'Successfully updated this book!');
    res.send(book);
};

// react version of: deleting a book
module.exports.deleteBook = async (req, res) => {
    const { id } = req.params;
    await Book.findByIdAndDelete(id);
    // req.flash('success', 'Successfully deleted a book!');
    res.send('Successfully deleted a book!');
};


