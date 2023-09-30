import BookEdit from './BookEdit';
import { useState, useContext } from 'react';
import BooksContext from '../context/books';
import BorrowLendContext from '../context/borrowLend';



function BookShow({ book, user }) {

    const { deleteBookById } = useContext(BooksContext);
    const { handleLend, cancelLend } = useContext(BorrowLendContext);

    //Handle the edit menu for every book
    const [showEdit, setShowEdit] = useState(false);

    const handleDeleteClick = () => {
        deleteBookById(book._id);
    }

    const handleEditClick = () => {
        setShowEdit(!showEdit);
    };

    //Handle submissions for edits
    const handleSubmit = () => {
        setShowEdit(false);
    }

    const handleLendClick = () => {
        handleLend(book._id);
    }

    const handleCancelCLick = () => {
        cancelLend(book._id);
    }

    //Show the book as object
    // let content = <div key={book._id}><p><img className='bookCover' src={bookImage} /></p><b>{book.title}</b><p>{book.author}</p>{book.ISBN}<p>{bookInLibrary}</p>{book.blurb}</div>
    let content = <div key={book._id}>
        <p><img className='bookCover' src={book.image} /></p>
        <b>{book.title}</b>
        {book.available === true ? <p>currently avalilable </p> : <p> availabe: {book.dueDate}</p>}
        <p>{book.author}</p>
        <p>{book.isbn} </p>
        <p>{book.blurb}</p>
    </div>
        ;

    let actions =
        <div className="actions">
            <p>
                <button className="edit" onClick={handleEditClick}>
                    Edit
                </button>
                <button className="delete" onClick={handleDeleteClick}>
                    Delete
                </button>
            </p>
        </div>


    if (!book.owner) {
        actions =<div className="actions">
        <p>
            <button className="borrow" onClick={handleLendClick}>
                Borrow
            </button>
            <button className="cancel" onClick={handleCancelCLick}>
                Cancel Borrow
            </button>
        </p>
    </div>
    }
    
    //if edit button has been pressed, show edit menu for set book
    if (showEdit) {
        // Esther to Alex: in BookEdit you don't actually read the user in and you don't need it for any logic
        // and I guess because of context you don't need to pass either book nor user down any more
        content = <BookEdit onSubmit={handleSubmit} book={book} user={user} />;
    }

    //Show book or edit menu for each book
    return <div className="book-show">
        {content}
        {actions}
    </div>
}

export default BookShow;