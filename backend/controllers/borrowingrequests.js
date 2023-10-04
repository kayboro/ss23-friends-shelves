const Book = require('../models/book');
const User = require('../models/user');
const Borrowingrequest = require('../models/borrowingrequest');

// create a borrowingrequest
module.exports.createBorrowingrequest = async (req, res) => {
    const reqTimestamp = new Date();
    const { id } = req.params;
    const book = await Book.findById(id);
    const { requserid, status, message, dueDate } = req.body.borrowingrequest;
    // Esther to Alex: comment 1 above, uncomment 2 below
    // const {status, message, dueDate } = req.body.borrowingrequest;
    // const requserid = req.user._id;
    const borrowingrequest = new Borrowingrequest();
    borrowingrequest.borrower = requserid;
    borrowingrequest.bookLocation = status;
    borrowingrequest.dueDate = dueDate;
    borrowingrequest.textlog.push({ messageText: message, messageWriter: 'b', messageTimestamp: reqTimestamp });
    borrowingrequest.bookLocationLog.push({ newBookLocation: status, bookLocationChanger: 'b', entryTimestamp: reqTimestamp });
    book.borrowingrequests.push(borrowingrequest);
    await borrowingrequest.save();
    await book.save();
    const user = await User.findById(requserid);
    user.requestlog.push(borrowingrequest);
    if (!user.watchlist.includes(id)) {
        user.watchlist.push(id);
    }
    await user.save();
    const response = await Book.findById(id).populate('borrowingrequests');
    const updatedBook = {
        _id: response._id, title: response.title, author: response.author, isbn: response.isbn, image: response.image, blurb: response.blurb,
        available: false,
        dueDate: dueDate,
        owner: false,
        borrowingrequests: [borrowingrequest]
    };
    // req.flash('success', 'Created new review!');
    // res.redirect(`/books/${id}`);
    res.send(updatedBook);
};

module.exports.deleteBorrowingrequest = async (req, res) => {
    const { id, borrowingrequestId } = req.params;
    const borrowingrequest = await Borrowingrequest.findById(borrowingrequestId);
    await Book.findByIdAndUpdate(id, { $pull: { borrowingrequests: borrowingrequestId } });
    await User.findByIdAndUpdate(borrowingrequest.borrower, { $pull: { requestlog: borrowingrequestId } });
    await Borrowingrequest.findByIdAndDelete(borrowingrequestId);
    // req.flash('success', 'Successfully deleted the borrowing request!');
    // res.redirect(`/books/${id}`);
    res.send('you deleted the borrowing request');
};

module.exports.deleteAllBorrowingrequest = async (req, res) => {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (book.borrowingrequests) {
        for (const borrowingrequestId of book.borrowingrequests) {
            const borrowingrequest = await Borrowingrequest.findById(borrowingrequestId);
            await User.findByIdAndUpdate(borrowingrequest.borrower, { $pull: { requestlog: borrowingrequestId } });
            await Borrowingrequest.findByIdAndDelete(borrowingrequestId);
        }
    };
    book.borrowingrequests = [];
    await book.save();
    const updatedBook = await Book.findById(id);
    res.send(updatedBook);
};


// handle post request to a specific borrowingrequest
module.exports.handlePostBorrowingrequest = async (req, res) => {
    const reqTimestamp = new Date();
    const { id, borrowingrequestId } = req.params;
    const { requserid, status, message } = req.body.borrowingrequest;
    // Esther to Alex: comment the above line and uncomment the following two lines - I'll then do the clean up, when the FE stands
    // const { status, message } = req.body.borrowingrequest;
    // const requserid = req.user._id;
    const dueDate = new Date(req.body.borrowingrequest.dueDate);
    const book = await Book.findById(id);
    const borrowingrequest = await Borrowingrequest.findById(borrowingrequestId);
    const pushMessage = () => {
        if (message) {
            borrowingrequest.textlog.push({ messageText: message, messageWriter: book.owner.equals(requserid) ? 'l' : 'b', messageTimestamp: reqTimestamp });
        };
    };
    const pushBookLocationChange = () => {
        borrowingrequest.bookLocationLog.push({ newBookLocation: status, bookLocationChanger: book.owner.equals(requserid) ? 'l' : 'b', entryTimestamp: reqTimestamp });
    };

    // some logic that only allows dueDate adjustment for dueDates that lie in the future 
    // and prevent L to set dueDate in transferBtoL previous of the reqTimestampPlus3days
    const setDueDate = () => {
        if (borrowingrequest.bookLocation === 'transferBtoL') {
            if (borrowingrequest.dueDate < dueDate) {
                borrowingrequest.dueDate = dueDate;
            } else if (borrowingrequest.dueDate >= dueDate) {
                console.log(`dueDate must be after the ${borrowingrequest.dueDate}`);
            };
        } else if (dueDate > reqTimestamp) {
            borrowingrequest.dueDate = dueDate;
        } else if (dueDate <= reqTimestamp) {
            // req.flash('error', 'Select a date that lies in the future!');
            // return res.redirect('/books/:id');
            console.log('dueDate must be in the future');
        }
    };

    // Esther: check the dueDate setting logic, so that its borrower and lender friendly when FE is up
    // logic for updating the request depending on the current situation
    if (borrowingrequest.bookLocation === 'home' && status === 'declined') {
        borrowingrequest.bookLocation = status;
        borrowingrequest.dueDate = reqTimestamp;
        pushMessage();
        pushBookLocationChange();
        await borrowingrequest.save();
    } else if (borrowingrequest.bookLocation === 'home' && status === 'transferLtoB' && book.owner.equals(requserid)) {
        borrowingrequest.bookLocation = status;
        setDueDate();
        pushMessage();
        pushBookLocationChange();
        await borrowingrequest.save();
    } else if (borrowingrequest.bookLocation === 'transferLtoB' && status === 'atB' && borrowingrequest.borrower.equals(requserid)) {
        borrowingrequest.bookLocation = status;
        pushMessage();
        pushBookLocationChange();
        await borrowingrequest.save();
    } else if (borrowingrequest.bookLocation === 'atB' && status === 'transferBtoL' && borrowingrequest.borrower.equals(requserid)) {
        borrowingrequest.bookLocation = status;
        borrowingrequest.dueDate = reqTimestamp;
        pushMessage();
        pushBookLocationChange();
        await borrowingrequest.save();
    } else if (borrowingrequest.bookLocation === 'atB' && status === 'transferBtoL' && book.owner.equals(requserid)) {
        borrowingrequest.bookLocation = status;
        const reqTimestampPlus3days = new Date(reqTimestamp.setDate(reqTimestamp.getDate() + 3));
        borrowingrequest.dueDate = reqTimestampPlus3days;
        pushMessage();
        pushBookLocationChange();
        await borrowingrequest.save();
    } else if (borrowingrequest.bookLocation === 'transferBtoL' && status === 'backHome' && book.owner.equals(requserid)) {
        borrowingrequest.bookLocation = status;
        pushMessage();
        pushBookLocationChange();
        await borrowingrequest.save();
        const user = await User.findById(borrowingrequest.borrower);
        if (!user.knownBooks.includes(id)) {
            console.log('hit known');
            user.knownBooks.push(id);
        };
        if (user.watchlist.includes(id)) {
            console.log('hit known');
            user.watchlist.pull(id);
        };
        await user.save();
    } else if (borrowingrequest.bookLocation === status && book.owner.equals(requserid)) {
        setDueDate();
        pushMessage();
        await borrowingrequest.save();
    } else if (borrowingrequest.bookLocation === status && borrowingrequest.borrower.equals(requserid)) {
        pushMessage();
        await borrowingrequest.save();
    } else {
        // req.flash('error', 'Something went wrong with updating this request. Couldn't do it.');
        // return res.redirect('/books/:id');
        console.log('next try')
    };
    const response = await Book.findById(id).populate('borrowingrequests');
    const updatedBook = {
        _id: response._id, title: response.title, author: response.author, isbn: response.isbn, image: response.image, blurb: response.blurb,
        available:
            ['backHome', 'declined'].includes(response.borrowingrequests[response.borrowingrequests.length - 1].bookLocation)
                ? true : false,
        dueDate:
            ['backHome', 'declined'].includes(response.borrowingrequests[response.borrowingrequests.length - 1].bookLocation)
                ? '' : response.borrowingrequests[response.borrowingrequests.length - 1].dueDate,
        owner: book.owner.equals(requserid) ? true : false,
        borrowingrequests: book.owner.equals(requserid) ? response.borrowingrequests : [borrowingrequest]
    };
    res.send(updatedBook);
};

