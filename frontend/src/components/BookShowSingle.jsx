import BookEdit from './BookEdit';
import { useState, useContext, useEffect } from 'react';
import BooksContext from '../context/books';
import BorrowLendContext from '../context/borrowLend';
import NavigationContext from '../context/navigation';



function BookShowSingle() {

    const { deleteBookById, bookInfo, singleBook } = useContext(BooksContext);
    const { handleLend, cancelLend, statusLend, acceptLend, declineLend } = useContext(BorrowLendContext);
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

    const handleAcceptLendClick = () => {
        console.log(bookData);
        acceptLend(bookData._id, bookData.borrowingrequests[0]._id);
    }

    const handleDeclineLendClick = () => {
        console.log(bookData);
        declineLend(bookData._id, bookData.borrowingrequests[0]._id);
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
    let borrowAction = <></>


    if(bookData == undefined){
        bookInfo(currentPath)
    }
    else{
        content = <div className = "singleBookPage" key={bookData._id}><p><img className='bookCover' src={bookData.image} /></p><b>{bookData.title}</b><p>{bookData.author}</p>{bookData.isbn}<p>{bookData.blurb}</p>
        {bookData.available === true ? <p>Currently Available </p> : <p> Available: {bookData.dueDate}</p>}</div>
        
        if(bookData.borrowingrequests){
            //console.log(bookData);
            let messenger = ""
            if(bookData.borrowingrequests[0].textlog[0].messageWriter === "b" && !bookData.owner ){
                messenger = "You"
            }
            else if(bookData.borrowingrequests[0].textlog[0].messageWriter === "b" && bookData.owner ){
                messenger = "Borrower"
            }
            if(bookData.borrowingrequests[0].bookLocation === "home" && bookData.owner){
                borrowAction = <div><button className="accept" onClick={handleAcceptLendClick}>Accept</button>
                <button className="decline" onClick={handleDeclineLendClick}>Decline</button>
                </div> 
            }
            message = <div className = "singleBookPage">{messenger}: {bookData.borrowingrequests[0].textlog[0].messageText} {borrowAction}</div>
        
        }
    }    

       

      
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
    //if edit button has been pressed, show edit menu for set book
    if (showEdit) {
        // Esther to Alex: in BookEdit you don't actually read the user in and you don't need it for any logic
        // and I guess because of context you don't need to pass either book nor user down any more
        content = <BookEdit onSubmit={handleSubmit} book={bookData} />;
        actions = <></>;
    }

    //Show book or edit menu for each book
    return <div>
        {content}
        {actions}
        {message}
    </div>
}

export default BookShowSingle;