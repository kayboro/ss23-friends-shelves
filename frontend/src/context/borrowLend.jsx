import { createContext, useState } from 'react';
import axios from 'axios';

const BorrowLendContext = createContext();

function BorrowLendProvider({ children }){

  const [borrowMessages, setBorrowMessages] = useState([]); 
  const [availabilityValue, setAvailabilityValue] = useState([]);

  const handleLend = async (bookIDNumber, message) => {    
    try{
      const input = {
        borrowingrequest: {
          status: "home",
          message: `${message}`,
          dueDate: "2023-11-20"
          }
      };
      const response = await axios.post(`http://localhost:8080/books/${bookIDNumber}/borrowingrequest`, input, { withCredentials: true });
      console.log(response);
      return(response.data);
    } catch (e) {
      console.log(e)
      };
  }

  const resetLend = async (bookIDNumber) => {
    
    try{
      const input = {
        borrowingrequest: {
          status: "declined",
          message: "sorry missclicked",
          }
      };
      const response = await axios.delete(`http://localhost:8080/books/${bookIDNumber}/borrowingrequest/`, input, { withCredentials: true });
      console.log(response);
      setBorrowMessages([]);
      return(response.data);
    } catch (e) {
      console.log(e)
      };
  }

  const statusLend = async (bookIDNumber) => {
      
    const response = await axios.get(`http://localhost:8080/books/${bookIDNumber}`, { withCredentials: true });
      
      if(response.data == undefined){
        console.log("no borrow requests at the moment");
      }
      else
      {
        console.log(response.data.borrowingrequests);
      }      
  }

  const acceptLend = async (bookIDNumber, borrowingRequestID) => {
   try{
    const input = {
      borrowingrequest: {
        status: "transferLtoB",
        message: "sure you can have it",
        dueDate: "2023-11-18"
        }
    };
    console.log(bookIDNumber);
    console.log(borrowingRequestID);
    const response = await axios.post(`http://localhost:8080/books/${bookIDNumber}/borrowingrequest/${borrowingRequestID}`, input, { withCredentials: true });
    console.log(response.data);
    getBorrowMessages(response.data);
    return(response.data);
  } catch(e){
    console.log(e);
  }
  }

  const declineLend = async (bookIDNumber, borrowingRequestID) => {
    try{
     const input = {
       borrowingrequest: {
         status: "declined",
         message: "no sorry",
         dueDate: "2023-11-18"
         }
     };
 
     console.log(bookIDNumber);
     console.log(borrowingRequestID);
     const response = await axios.post(`http://localhost:8080/books/${bookIDNumber}/borrowingrequest/${borrowingRequestID}`, input, { withCredentials: true });
     console.log(response.data);
     getBorrowMessages(response.data);
     return(response.data);
   } catch(e){
     console.log(e);
   }
  }

   const getBorrowMessages = (book) => {
    const textLog = book.borrowingrequests[0].textlog;
    const messageLog = [];
    for(let i = 0; i <= (textLog.length -1); i++){
      let messenger = ""     
      if(book.borrowingrequests[0].textlog[i].messageWriter === "b" && !book.owner || book.borrowingrequests[0].textlog[i].messageWriter === "l" && book.owner){
        messenger = "You"
      }
      else if(book.borrowingrequests[0].textlog[i].messageWriter === "b" && book.owner ){
          messenger = "Borrower"
      }
      else{
        messenger = "Lender"
      };
      if(book.borrowingrequests[0].textlog[i].messageText !=""){
        messageLog.push(<p>{messenger}: {book.borrowingrequests[0].textlog[i].messageText}</p>);
      }
    }
    setBorrowMessages(messageLog);
    setAvailabilityValue(book.dueDate);
   }

  
   const handleBorrowRequest = async (bookIDNumber, borrowingRequestID, message, status, dueDate) => {
    try{
      let input = {}
      if(dueDate === ""){
          input = {
            borrowingrequest: {
              status: status,
              message: message,
              }  
        }
      }else{
        input = {
          borrowingrequest: {
            status: status,
            message: message,
            dueDate: dueDate
            }
          }
        };
      const response = await axios.post(`http://localhost:8080/books/${bookIDNumber}/borrowingrequest/${borrowingRequestID}`, input, { withCredentials: true });
      getBorrowMessages(response.data);
      console.log(response.data);
      return(response.data);
    } catch(e){
      console.log(e);
    }
   }
  



  const valueToShare = {
    handleLend,
    statusLend,
    acceptLend,
    declineLend,
    getBorrowMessages,
    borrowMessages,
    resetLend,
    handleBorrowRequest,
    availabilityValue
    
}

    return <BorrowLendContext.Provider value={valueToShare}>
        { children }
    </BorrowLendContext.Provider>

}

export { BorrowLendProvider };
export default BorrowLendContext;