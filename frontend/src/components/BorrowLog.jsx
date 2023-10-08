
import { useState, useContext, useEffect } from 'react';
import moment from 'moment';
import BooksContext from '../context/books';
import BorrowLendContext from '../context/borrowLend';
import NavigationContext from '../context/navigation';



function BorrowLog({bookData}) {

    const { bookInfo } = useContext(BooksContext);
    const { handleBorrowRequest, acceptLend, declineLend, getBorrowMessages, borrowMessages, resetLend } = useContext(BorrowLendContext);
    const { currentPath } = useContext(NavigationContext);
    const [showBorrowActionButtons, setShowBorrowActionButtons] = useState(false);
    const [showMessenger, setShowMessenger] = useState(false);
    const [showDueDateField, setShowDueDateField] = useState(false);
    const [showReturnButton, setShowReturnButton] = useState(false);

     //Show the book as object
     let message = <></>;
     let dueDateField = <></>;
     let messenger = <></>;
     let borrowAction = <></>;
     let borrowRequest = <></>;
     let dueDate = bookData.dueDate;
     let returnButton = <></>;

    const handleCancelClick = async () => {
        const response = await handleBorrowRequest(bookData._id, bookData.borrowingrequests[0]._id, "REQUEST CANCELLED","declined","");
        bookInfo(response._id);
    };

    const handleResetClick = async () => {
        const response = await resetLend(bookData._id);
        bookInfo(response._id);
    };

    const handleAcceptLendClick = async () => {
        const response = await acceptLend(bookData._id, bookData.borrowingrequests[0]._id);
        setShowBorrowActionButtons(false);
        getBorrowMessages(response);
    };

    const handleDeclineLendClick = async () => {
        const response = await declineLend(bookData._id, bookData.borrowingrequests[0]._id);
        setShowBorrowActionButtons(false);
        getBorrowMessages(response);
    };

    const handleMessageClick = async () => {
        if(!bookData.owner){
            const response = await handleBorrowRequest(bookData._id, bookData.borrowingrequests[0]._id,formData.messenger,"atB","");
            bookInfo(response._id);
        }else{
            const response = await handleBorrowRequest(bookData._id, bookData.borrowingrequests[0]._id, formData.messenger,"atB",formData.dueDate);
            bookInfo(response._id);
            setFormData({ message: "Hi I would like to borrow this book", messenger: "" });
        }
        setFormData({ message: "Hi I would like to borrow this book", messenger: "" });
    };

    const handleReturnClick = async () => {
        if(!bookData.owner){
            const response = await handleBorrowRequest(bookData._id, bookData.borrowingrequests[0]._id,"Done reading, will send the book back","transferBtoL","transferBtoL",bookData.dueDate);
        }else{
            const response = await handleBorrowRequest(bookData._id, bookData.borrowingrequests[0]._id,"Need the book back, please return it before the new due date","transferBtoL",moment().format('YYYY-MM-DD'));
            bookInfo(response._id);
        }
    }

    const [formData, setFormData] = useState({ message: "Hi I would like to borrow this book", messenger: "", dueDate: dueDate });

    const handleChange = (event) => {
        const changedField = event.target.name;
        const newValue = event.target.value;
        setFormData(currData => {
            currData[changedField] = newValue;
            return { ...currData };
        })

    }
         
    useEffect(() =>{
        if(bookData.borrowingrequests){
            if(Object.keys(bookData.borrowingrequests).length > 0){  
                dueDate =  bookData.dueDate.split("T");
                setFormData({ message: "Hi I would like to borrow this book", messenger: "", dueDate: dueDate[0] }); 
                
                    if(bookData.borrowingrequests[0].bookLocation == "home" && bookData.owner){
                        setShowBorrowActionButtons(true);   
                    }
                    getBorrowMessages(bookData);

                    if(bookData.borrowingrequests[0].bookLocation == "transferLtoB" && !bookData.owner){
                        setShowMessenger(true);
                    }
                    if(bookData.borrowingrequests[0].bookLocation == "atB"){
                        setShowMessenger(true);
                        setShowReturnButton(true);
                    }
                    if(bookData.borrowingrequests[0].bookLocation == "atB" && bookData.owner){
                        setShowDueDateField(true);
                    }
               }
        }
    },[bookData])
    
    message = <div className = "bookDataPage">{borrowMessages}</div>
    const resetButton = <p><button className="Reset" onClick={handleResetClick}>Reset</button></p>

    if(bookData.borrowingrequests[0].bookLocation === "home" && showBorrowActionButtons){
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
        </p>
    </div>
    };  

    if(showDueDateField === true){
        dueDateField = <p>
           <input type="date" id="dueDate" name="dueDate" value={formData.date} min={moment().format('YYYY-MM-DD')} max="2050-12-31" onChange={handleChange} />
        </p>
    }

    if(showReturnButton === true){
        returnButton =
        <p>
            <button className="borrow" onClick={handleReturnClick}>Return</button>
        </p>
    }

    //Show book or edit menu for each book
    return <div>
        {borrowRequest}
        {borrowAction}
        {message}
        {messenger}
        {dueDateField}
        {returnButton}
        {resetButton}
    </div>
}

export default BorrowLog;