import { useState, useContext } from 'react';
import BorrowLendContext from '../context/borrowLend';
import BooksContext from '../context/books';

function BorrowRequester({bookData}) {

    const { bookInfo } = useContext(BooksContext);
    const { handleLend } = useContext(BorrowLendContext);
    const [showBorrowRequestfield, setShowBorrowRequestfield] = useState(true);
    
    //Handle borrow test buttons
    const handleLendClick = async () => {
        const response = await handleLend(bookData._id, formData.message);
        bookInfo(response._id);
        setShowBorrowRequestfield(false);
    };
   
    const [formData, setFormData] = useState({ message: "Hi I would like to borrow this book"});

    const handleChange = (event) => {
        const changedField = event.target.name;
        const newValue = event.target.value;
        setFormData(currData => {
            currData[changedField] = newValue;
            return { ...currData };
        })
    };

    let borrowRequest = <></>;
    
    if(showBorrowRequestfield === true){
        borrowRequest = <p>
            <input className="input" value={formData.message} onChange={handleChange} name="message" />
            <button className="borrow" onClick={handleLendClick}>
                Borrow
            </button>
        </p>
    };

    return <div>
        {borrowRequest}
    </div>
}

export default BorrowRequester;