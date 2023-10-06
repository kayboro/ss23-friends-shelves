import BookEdit from './BookEdit';
import { useState, useContext, useEffect } from 'react';
import BooksContext from '../context/books';
import BorrowLendContext from '../context/borrowLend';
import NavigationContext from '../context/navigation';



function BorrowLog() {

    const { deleteBookById, bookInfo, singleBook } = useContext(BooksContext);
    const { handleLend, cancelLend, statusLend } = useContext(BorrowLendContext);
    const { currentPath } = useContext(NavigationContext);
    const [bookData, setBookData] = useState({})

    useEffect(() => {
        bookInfo(currentPath);
      }, [currentPath]);

    useEffect(() => {
        setBookData(singleBook.data);
    }, [singleBook]);




    //Handle the edit menu for every book
    const [showEdit, setShowEdit] = useState(false);

    const handleDeleteClick = () => {
        deleteBookById(bookData._id);
    }

    const handleEditClick = () => {
        setShowEdit(!showEdit);
    };

    //Handle submissions for edits
    const handleSubmit = () => {
        setShowEdit(false);
    }


    //Handle borrow test buttons
    const handleLendClick = () => {
        handleLend(bookData._id, formData.message);
        bookInfo(currentPath);
        handleStatusCLick();
    }

    const handleCancelCLick = () => {
        cancelLend(bookData._id);
        bookInfo(currentPath);
    }

    const handleStatusCLick = () => {
        statusLend(bookData._id);
        bookInfo(currentPath);
    }

    const [formData, setFormData] = useState({ message: "Hi I would like to borrow this book" });

    const handleChange = (event) => {
        const changedField = event.target.name;
        const newValue = event.target.value;
        setFormData(currData => {
            currData[changedField] = newValue;
            return { ...currData };
        })

    }

    //Show the book as object
    let content = <></>
    let message = <></>
    let actions = <></>


    if(bookData == undefined){
        bookInfo(currentPath)
    }
    else{
        content = <div className = "singleBookPage" key={bookData._id}><p><img className='bookCover' src={bookData.image} /></p><b>{bookData.title}</b><p>{bookData.author}</p>{bookData.isbn}<p>{bookData.blurb}</p>
        {bookData.available === true ? <p>Currently Available </p> : <p> Available: {bookData.dueDate}</p>}</div>
        
        if(bookData.borrowingrequests){
            let messenger = "Lender"
            if(bookData.borrowingrequests[0].textlog[0].messageWriter === "b" ){
                messenger = "You"
            }
            console.log(bookData.borrowingrequests[0].textlog[0].messageText);
            message = <div className = "singleBookPage">{messenger}: {bookData.borrowingrequests[0].textlog[0].messageText}</div>
        }    
};


if(bookData ===undefined){
    bookInfo(currentPath)
}
else{
        if (!bookData.owner) {
            actions = <div className="actions">
            <p>
                <input className="input" value={formData.message} onChange={handleChange} name="message" />
                <button className="borrow" onClick={handleLendClick}>
                    Borrow
                </button>
            </p><p>
                <button className="cancel" onClick={handleCancelCLick}>
                    Cancel Borrow
                </button>
                <button className="status" onClick={handleStatusCLick}>
                    Status Borrow
                </button>
            </p>
        </div>
        }
};    
   
    //Show book or edit menu for each book
    return <div>
        {content}
        {actions}
        {message}
    </div>
}

export default BorrowLog;