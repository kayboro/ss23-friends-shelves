
import { useState, useContext, useEffect } from 'react';
import moment from 'moment';
import BooksContext from '../context/books';
import BorrowLendContext from '../context/borrowLend';
import NavigationContext from '../context/navigation';



function BorrowLog({bookData}) {

    const { bookInfo } = useContext(BooksContext);
    const { handleLend, cancelLend, statusLend, acceptLend, declineLend, getBorrowMessages, borrowMessages, sendMessage, resetLend } = useContext(BorrowLendContext);
    const { currentPath } = useContext(NavigationContext);
    const [showBorrowActionButtons, setShowBorrowActionButtons] = useState(false);
    const [showMessenger, setShowMessenger] = useState(false);
    const [showBorrowRequestfield, setShowBorrowRequestfield] = useState(true);
    const [showDueDateField, setShowDueDateField] = useState(false);
    const [availabilityValue, setAvailabilityValue] = useState();

    //Handle borrow test buttons
    const handleLendClick = () => {
        handleLend(bookData._id, formData.message);
        bookInfo(currentPath);
        handleStatusCLick();
    };

    const handleCancelClick = () => {
        cancelLend(bookData._id, bookData.borrowingrequests[0]._id);
        bookInfo(currentPath);
    };

    const handleResetClick = () => {
        resetLend(bookData._id);
        bookInfo(currentPath);
    };

    const handleStatusCLick = () => {
        statusLend(bookData._id);
        bookInfo(currentPath);
    };

    const handleAcceptLendClick = () => {
        console.log(bookData);
        acceptLend(bookData._id, bookData.borrowingrequests[0]._id);
        setShowBorrowActionButtons(false);
        getBorrowMessages(bookData);
    };

    const handleDeclineLendClick = () => {
        console.log(bookData);
        declineLend(bookData._id, bookData.borrowingrequests[0]._id);
        setShowBorrowActionButtons(false);
        getBorrowMessages(bookData);
    };

    const handleMessageClick = () => {
        sendMessage(bookData._id, bookData.borrowingrequests[0]._id,formData.messenger, "");
        setFormData({ message: "Hi I would like to borrow this book", messenger: "" });
    };

    const handleDueDateClick = () => {
        sendMessage(bookData._id, bookData.borrowingrequests[0]._id, formData.messenger, formData.dueDate);
        setAvailabilityValue(`Due Date: ${formData.dueDate}`);
        setFormData({ message: "Hi I would like to borrow this book", messenger: "" });
    };

    const [formData, setFormData] = useState({ message: "Hi I would like to borrow this book", messenger: "", dueDate: moment().format('YYYY-MM-DD') });

    const handleChange = (event) => {
        const changedField = event.target.name;
        const newValue = event.target.value;
        setFormData(currData => {
            currData[changedField] = newValue;
            return { ...currData };
        })

    }

    //Show the book as object
    let message = <></>;
    let dueDateField = <></>;
    let messenger = <></>;
    let borrowAction = <></>;
    let borrowRequest = <></>;
    let dueDate = "";
    let availability = <p>{availabilityValue}</p>
    const resetButton = <p><button className="Reset" onClick={handleResetClick}>Reset</button></p>

         
    useEffect(() =>{

        if(bookData.owner){
            setShowBorrowRequestfield(false);
        }
        if(bookData.borrowingrequests){
            if(Object.keys(bookData.borrowingrequests).length > 0){  
                dueDate =  bookData.dueDate.split("T");
                setAvailabilityValue(`Due Date: ${dueDate[0]}`); 
                
                    if(bookData.borrowingrequests[0].bookLocation == "home" && bookData.owner){
                        setShowBorrowActionButtons(true);   
                    }
                    setShowBorrowRequestfield(false);
                    getBorrowMessages(bookData);

                    if(bookData.borrowingrequests[0].bookLocation == "transferLtoB" && !bookData.owner){
                        setShowMessenger(true);
                    }
                    if(bookData.borrowingrequests[0].bookLocation == "atB"){
                        setShowMessenger(true);
                    }
                    if(bookData.borrowingrequests[0].bookLocation == "atB" && bookData.owner){
                        setShowDueDateField(true);
                    }
               }
        }else{
            setAvailabilityValue("Available");
        }
    },[bookData])
    
    message = <div className = "bookDataPage">{borrowMessages}</div>

    if(showBorrowActionButtons === true){
        borrowAction = <div>
                <button className="accept" onClick={handleAcceptLendClick}>Accept</button>
                <button className="decline" onClick={handleDeclineLendClick}>Decline</button>
            </div> 
    }

    if(showMessenger){
        messenger = <p><input className="input" value={formData.messenger} onChange={handleChange} name="messenger" />
        <button className="borrow" onClick={handleMessageClick}>Send</button></p>
    }
    
    if (!bookData.owner) {
        borrowAction = <div className="actions">
        <p>
            <button className="cancel" onClick={handleCancelClick}>
                Cancel Borrow
            </button>
            <button className="status" onClick={handleStatusCLick}>
                Status Borrow
            </button>
        </p>
    </div>
    };  
    
    if(showBorrowRequestfield === true){
        borrowRequest = <p>
            <input className="input" value={formData.message} onChange={handleChange} name="message" />
            <button className="borrow" onClick={handleLendClick}>
                Borrow
            </button>
        </p>
    }

    if(showDueDateField === true){
        dueDateField = <p>
           <input type="date" id="dueDate" name="dueDate" value={formData.date} min={moment().format('YYYY-MM-DD')} max="2050-12-31" onChange={handleChange} />
           <button className="dueDate" onClick={handleDueDateClick}>
                Change Date
            </button>
        </p>
    }

    //Show book or edit menu for each book
    return <div>
        {availability}
        {borrowRequest}
        {borrowAction}
        {dueDateField}
        {message}
        {messenger}
        {resetButton}
    </div>
}

export default BorrowLog;